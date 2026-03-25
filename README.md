# danialrp.com — Personal Portfolio

[![React](https://img.shields.io/badge/React-16.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![SASS](https://img.shields.io/badge/SASS-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?logo=github&logoColor=white)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Personal portfolio site for **Danial Panah** — Senior Backend Engineer with 10+ years building production systems in Go, Python, and PHP/Laravel.

Live at **[danialrp.com](https://danialrp.com)**

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 16, SASS |
| Animations | Lottie |
| Live data | GitHub GraphQL API, GitLab REST API |
| Containerisation | Docker |
| Deployment | GitHub Pages / Netlify |

---

## Prerequisites

- Node.js `v16+`
- npm `v8+`
- Git `v2.17+`

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/danialrp/danialrp.git
cd danialrp
npm install
```

### 2. Configure environment variables

```bash
cp env.example .env
```

Open `.env` and fill in your values:

```env
REACT_APP_GITHUB_TOKEN = "your_github_personal_access_token"
GITHUB_USERNAME        = "your_github_username"
USE_GITHUB_DATA        = "true"
REACT_APP_GITLAB_TOKEN = "your_gitlab_read_user_token"
MEDIUM_USERNAME        = "your_medium_username"    # optional
```

> **GitHub token:** go to **Settings → Developer settings → Personal access tokens → Classic**. No scopes are needed — generate a token as-is.
>
> **GitLab token:** create a token with only the `read_user` scope.

### 3. Start the dev server

```bash
npm start
```

Runs at `http://localhost:3000`. API data is fetched automatically before the server starts.

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Fetch API data and start dev server |
| `npm run build` | Production build |
| `npm run deploy` | Build and deploy to GitHub Pages (`master` branch) |
| `npm test` | Run test suite |
| `npm run format` | Auto-format JS / CSS / SCSS / JSON with Prettier |
| `npm run check-format` | Check formatting without writing |

---

## Docker

```bash
# Build
docker build -t danialrp-portfolio:latest .

# Run
docker run -p 3000:3000 \
  -e REACT_APP_GITHUB_TOKEN="your_token" \
  -e GITHUB_USERNAME="your_username" \
  -e USE_GITHUB_DATA="true" \
  danialrp-portfolio:latest
```

---

## Content

All portfolio data is in one place:

```
src/portfolio.js
```

| Export | Section |
|---|---|
| `greeting` | Name, headline, resume link |
| `socialMediaLinks` | GitHub, LinkedIn, GitLab, X |
| `skillsSection` | Skills list and icons |
| `techStack` | Technology stack display |
| `workExperience` | Employment history |
| `bigProjects` | Featured projects |
| `achievementSection` | Awards and certifications |
| `contactInfo` | Contact details |

### Theming

Global colour palette: `src/_globalColor.scss`

### Resume

Drop a PDF into `public/` and update `resumeLink` in `src/portfolio.js` to match the filename.

---

## Deployment

### GitHub Pages

Update `homepage` in `package.json` with your Pages URL, then:

```bash
npm run deploy
```

### Netlify / Vercel

- Build command: `npm run build`
- Publish directory: `build/`
- Add environment variables via the platform dashboard

---

## Project Structure

```
src/
├── assets/           # Images, Lottie JSON, SVG icons
├── components/       # Shared UI components
├── containers/       # Page sections (greeting, skills, projects…)
├── contexts/         # React context (theme)
├── portfolio.js      # All content configuration
└── _globalColor.scss # Global colour variables
```

---

## Credits

- Lottie animations via [LottieFiles](https://lottiefiles.com)
- Illustrations via [unDraw](https://undraw.co)
