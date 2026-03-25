#!/usr/bin/env python3
"""
Generate all favicon assets for danialrp.com
Design: Dark navy background (#0f1221) with "DP" monogram
        Blue (#4a9eff) left half, Teal (#00d4aa) right half — matching the splash gradient
"""

import struct
import zlib
from PIL import Image, ImageDraw, ImageFont
import os

# Brand colors (matching site theme)
BG_COLOR = (15, 18, 33)          # #0f1221 — dark navy
BLUE     = (74, 158, 255)        # #4a9eff
TEAL     = (0, 212, 170)         # #00d4aa
WHITE    = (255, 255, 255)

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public')

FONT_PATH = '/System/Library/Fonts/SFNS.ttf'


def make_icon(size, corner_radius_ratio=0.18):
    """Render the DP monogram icon at given pixel size."""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    r = max(2, int(size * corner_radius_ratio))

    # --- Rounded background ---
    draw.rounded_rectangle([(0, 0), (size - 1, size - 1)], radius=r, fill=BG_COLOR + (255,))

    # --- "DP" text ---
    # Use about 60% of height for font size
    font_size = max(6, int(size * 0.52))
    try:
        font = ImageFont.truetype(FONT_PATH, font_size)
    except Exception:
        font = ImageFont.load_default()

    text = "DP"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = (size - tw) // 2 - bbox[0]
    ty = (size - th) // 2 - bbox[1]

    if size >= 32:
        # Split gradient: left half blue, right half teal
        # Draw text twice with a clip mask per half
        mid_x = size // 2

        # Left half (blue) — clip via a temp layer
        left_layer = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        left_draw = ImageDraw.Draw(left_layer)
        left_draw.text((tx, ty), text, font=font, fill=BLUE + (255,))
        # Crop right half away
        left_layer_arr = left_layer.load()
        for x in range(mid_x, size):
            for y in range(size):
                left_layer_arr[x, y] = (0, 0, 0, 0)

        # Right half (teal)
        right_layer = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        right_draw = ImageDraw.Draw(right_layer)
        right_draw.text((tx, ty), text, font=font, fill=TEAL + (255,))
        right_layer_arr = right_layer.load()
        for x in range(0, mid_x):
            for y in range(size):
                right_layer_arr[x, y] = (0, 0, 0, 0)

        img = Image.alpha_composite(img, left_layer)
        img = Image.alpha_composite(img, right_layer)
    else:
        # Small sizes: single color (blue)
        draw2 = ImageDraw.Draw(img)
        draw2.text((tx, ty), text, font=font, fill=BLUE + (255,))

    return img


def save_png(img, path):
    img.save(path, 'PNG')
    print(f'  Saved {path}')


def build_ico(sizes):
    """Build a multi-size .ico file from a dict of {size: Image}."""
    # ICO header: ICONDIR
    num_images = len(sizes)
    header = struct.pack('<HHH', 0, 1, num_images)  # reserved, type=1 (ico), count

    # We'll write PNG-compressed entries (Vista+ ICO format)
    entries = []
    image_data = []
    offset = 6 + 16 * num_images  # header + entries

    for size, img in sorted(sizes.items()):
        import io
        buf = io.BytesIO()
        img.save(buf, format='PNG')
        data = buf.getvalue()
        image_data.append(data)

        w = size if size < 256 else 0
        h = size if size < 256 else 0
        # ICONDIRENTRY: width, height, colorCount, reserved, planes, bitCount, bytesInRes, imageOffset
        entries.append(struct.pack('<BBBBHHII', w, h, 0, 0, 1, 32, len(data), offset))
        offset += len(data)

    with open(os.path.join(OUTPUT_DIR, 'favicon.ico'), 'wb') as f:
        f.write(header)
        for e in entries:
            f.write(e)
        for d in image_data:
            f.write(d)
    print(f'  Saved {os.path.join(OUTPUT_DIR, "favicon.ico")}')


def make_safari_svg():
    """Monochrome SVG for Safari pinned tabs.
    Must be black shapes on transparent background — Safari applies its own tint color."""
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text x="50" y="74" text-anchor="middle" font-family="SF Pro Display, Helvetica Neue, Helvetica, Arial, sans-serif"
        font-weight="700" font-size="54" fill="black">DP</text>
</svg>'''
    path = os.path.join(OUTPUT_DIR, 'safari-pinned-tab.svg')
    with open(path, 'w') as f:
        f.write(svg)
    print(f'  Saved {path}')


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print('Generating favicons...')

    # Generate images at all needed sizes
    icons = {s: make_icon(s) for s in [16, 32, 48, 64, 150, 180, 192, 384]}

    # Rasterize each required file
    save_png(icons[16],  os.path.join(OUTPUT_DIR, 'favicon-16x16.png'))
    save_png(icons[32],  os.path.join(OUTPUT_DIR, 'favicon-32x32.png'))
    save_png(icons[180], os.path.join(OUTPUT_DIR, 'apple-touch-icon.png'))
    save_png(icons[192], os.path.join(OUTPUT_DIR, 'android-chrome-192x192.png'))
    save_png(icons[384], os.path.join(OUTPUT_DIR, 'android-chrome-384x384.png'))
    save_png(icons[150], os.path.join(OUTPUT_DIR, 'mstile-150x150.png'))

    # Multi-size ICO (16, 32, 48)
    build_ico({16: icons[16], 32: icons[32], 48: make_icon(48)})

    # Safari SVG
    make_safari_svg()

    print('\nDone! All favicons written to public/')


if __name__ == '__main__':
    main()
