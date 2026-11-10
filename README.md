# Subhankar Giri — Personal Portfolio Website

A modern, high-performance personal portfolio built for **Subhankar Giri** (Data Analyst & Data Scientist).

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Icons:** `lucide-react` & custom SVG brand icons
- **Typography (`next/font/google`):**
  - Headings: `Anton`
  - Body: `Geist`
  - Labels & Monospace: `Geist Mono`
  - Signature Handwritten Accent: `Caveat Brush`
- **Theme:** Dark `#09090b` zinc background with one vivid accent red `#ff3b2f`. (No purple gradients, no glass cards).

---

## 🤖 Signature Animation: 12 Robot Cursor Live Builder

When the page loads, the content starts empty (`visibility: hidden` controlled via inline `<head>` script to avoid FOUC). Up to 12 robot cursors (6 on mobile) glide across the screen and construct the page live in reading order:

1. **Scout, Layout, Typeset, Motion, QA, Deploy, Copy, Lint, Index, Render, Palette, Review**.
2. Each robot cursor has an arrow pointer, a colored tag, and a tiny animated robot head with **blinking LED eyes** and a **pulsing red antenna tip**.
3. A cursor glides to each element, drags out a **blue wireframe box** with corner handles and dimensions, and triggers the element's reveal:
   - `data-build="type"`: Text types out letter by letter.
   - `data-build="pop"`: Cards and stats pop in with a snappy spring ease.
   - `data-build="wipe"`: Major titles wipe in from left to right.
4. Max 6 elements build simultaneously. Elements already scrolled past appear instantly.

---

## 🎛️ Interactive Controls & Shortcuts

A floating control dock at the bottom of the screen provides:
- **Pause / Resume (`P` key):** Pauses/resumes cursor motion and construction.
- **Agents On/Off (`A` key):** Toggles robot cursors. When turned off, the entire page renders instantly. State is saved in `localStorage`.
- **Tour Mode (`T` key):** Scrolls to top, waits for the hero to construct, and initiates a smooth, steady auto-scroll down the entire site for screen recording. Scrolling or pressing `Esc` immediately cancels the tour.
- **URL Overrides:**
  - `?agents=on` forces the robot builder animation on.
  - `?agents=off` disables the robot animation for instant reading.

---

## 📂 Sections

1. **Hero (Full Screen):**
   - Giant metallic word `PORTFOLIO` with sheen sweep animation.
   - Transparent headshot in black & white (`grayscale contrast-125`) standing on a soft red radial glow with bottom edge fade.
   - Bio, role, handwritten intro, "View work" CTA, and "Based in Odisha, India" status line.
   - 3 real stats from resume: `5+` Deployed ML & Data Projects, `40+` GitHub Contributions, `4+` AI & Data Science Certifications.
2. **Work ("Work that ships"):**
   - 3 production projects from resume in clean text cards (no screenshots) with 3–4 bullet points, tech chips, and live/GitHub links:
     - Automated Data Cleaning & Preprocessing Studio
     - Exploratory Data Analysis (EDA) & Analytics Dashboard
     - Student Management System
3. **Stack (Endless Marquee):**
   - All tools from resume in an endless left-to-right marquee with faded edge masks. Pauses on hover.
4. **Record (Career & Academic Log):**
   - Full Stack Data Science Intern / Trainee at PythonSoft LLP
   - Data Science Virtual Intern at IncodeVision
   - B.Tech in CSE at BPUT / KMBB College of Engineering & Technology
   - +2 Higher Secondary (CHSE) & 10th Matriculation (BSE)
   - Certifications from Google Cloud & PythonSoft LLP
5. **About & Principles:**
   - 2 concise paragraphs strictly from resume facts.
   - Skills grid across 4 domain clusters.
   - 4 engineering principles Subhankar works by.
6. **Contact & Footer:**
   - Big CTA card with copy-to-clipboard email (`thesubhankar.giri992@gmail.com`), mailto link, and resume PDF link.
   - Social links (GitHub, LinkedIn, Website) and smooth Back-to-Top button.
   - **Phone number is never displayed.**

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

To create and run an optimized production build:

```bash
npm run build
npm run start
```

---

## ☁️ Free Deployment on Vercel

1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete Next.js 15 portfolio"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **"Add New..."** -> **"Project"**.
4. Select your repository: `thesubhankar/My-Portfolio-3d-`.
5. Vercel automatically detects **Next.js**:
   - **Framework Preset:** `Next.js`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
6. Click **Deploy**. Within ~1 minute, your portfolio will be live with a free SSL `.vercel.app` domain and automatic deployments on every git push!
