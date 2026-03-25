# Danial Panah — Personal Portfolio

A personal developer portfolio built with React, showcasing my experience as a Senior Backend Engineer. Features animated sections, GitHub/GitLab activity charts, skills display, and a downloadable resume.

## Tech Stack

- **React** (Create React App)
- **SASS** for styling
- **Lottie** for animations
- **GitHub GraphQL API** for live profile & repo data
- **GitLab API** for activity chart
- **Docker** for containerised runs

## Prerequisites

- Node.js `v16+`
- npm `v8+`
- Git

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/danialrp/danialrp.git
cd danialrp
npm install
```

### 2. Configure environment variables

```bash
cp env.example .env
```

Edit `.env` with your own values:

```env
REACT_APP_GITHUB_TOKEN = "your_github_personal_access_token"
GITHUB_USERNAME        = "danialrp"
USE_GITHUB_DATA        = "true"
REACT_APP_GITLAB_TOKEN = "your_gitlab_read_user_token"
MEDIUM_USERNAME        = "your_medium_username"   # optional
```

> Generate a GitHub classic token at **Settings → Developer settings → Personal access tokens**. No scopes are required — a plain token is enough.

### 3. Run locally

```bash
npm start
```

Opens at `http://localhost:3000`.

---

## Available Scripts

| Command          | Description                              |
|------------------|------------------------------------------|
| `npm start`      | Start dev server (fetches API data first)|
| `npm run build`  | Production build                         |
| `npm run deploy` | Deploy to GitHub Pages (`master` branch) |
| `npm test`       | Run tests                                |
| `npm run format` | Auto-format all JS/CSS/JSON/SCSS files   |

---

## Docker

```bash
# Build the image
docker build -t danialrp-portfolio:latest .

# Run the container
docker run -p 3000:3000 \
  -e REACT_APP_GITHUB_TOKEN="your_token" \
  -e GITHUB_USERNAME="danialrp" \
  -e USE_GITHUB_DATA="true" \
  danialrp-portfolio:latest
```

---

## Customisation

All portfolio content lives in a single file:

```
src/portfolio.js
```

Edit the exported objects to update any section:

| Object               | Controls                          |
|----------------------|-----------------------------------|
| `greeting`           | Name, subtitle, resume link       |
| `socialMediaLinks`   | GitHub, LinkedIn, GitLab, X, etc. |
| `skillsSection`      | Skills list and icons             |
| `workExperience`     | Job history                       |
| `bigProjects`        | Featured projects                 |
| `achievementSection` | Certifications & awards           |
| `contactInfo`        | Contact details                   |

### Global colour scheme

Edit `src/_globalColor.scss` to change the palette site-wide.

### Resume

Replace the PDF at `public/DanialPanah—SeniorBackendEngineer.pdf` and update `resumeLink` in `src/portfolio.js` to match the new filename.

### Lottie animations

Download a JSON animation from [lottiefiles.com](https://lottiefiles.com) and replace the file in `src/assets/lottie/`. Options can be tuned in `src/components/displayLottie/DisplayLottie.js`.

---

## Deployment

### GitHub Pages

1. Set `homepage` in `package.json` to your GitHub Pages URL.
2. Run `npm run deploy` — this builds and pushes to the `master` branch automatically.

### Netlify / Vercel

Connect the repository and set the build command to `npm run build` with publish directory `build/`. Add your environment variables in the platform's settings UI.

---

## Project Structure

```
src/
├── assets/          # Images, Lottie JSON, SVG icons
├── components/      # Reusable UI components
├── containers/      # Page sections (greeting, skills, experience…)
├── portfolio.js     # All portfolio content lives here
└── _globalColor.scss
```
