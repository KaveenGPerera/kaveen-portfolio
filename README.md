# Kaveen Perera — Portfolio

Static HTML/CSS/JS portfolio. No build step, no framework — works by just opening
`index.html`, and deploys as-is to any free static host.

## Folder structure

```
kaveen-portfolio/
├── index.html                 → all page content (single page)
├── favicon.svg                → browser tab icon (already done, "KP" mark)
├── README.md                  → this file
├── css/
│   └── style.css              → all styling, colors, layout, animations
├── js/
│   └── script.js              → nav, scroll reveal, CV download, project filter
└── assets/
    ├── images/
    │   └── profile.jpg        → ⚠️ ADD THIS — your photo (see below)
    │   └── projects/          → optional — only if you want real screenshots
    └── cv/
        ├── Kaveen_Perera_CV_ProjectManager.pdf   → from your PM-focused CV
        └── Kaveen_Perera_CV_UIUXDesigner.pdf      → from your design-focused CV
```

## Images you need to add

The site currently runs with **zero required images** — project thumbnails use
generated color-gradient placeholders (no files needed), and the hero shows a
"KP" placeholder if no photo is found. Only one image is worth adding:

1. **`assets/images/profile.jpg`** — your headshot/photo for the hero section.
   - Square-ish or portrait crop, at least 800×1000px, good lighting, plain
     or blurred background works best against the purple hero.
   - Once you drop a file with this exact name in that folder, it appears
     automatically — no code changes needed.

Optional, if you want to swap the gradient placeholders for real screenshots later:
- `assets/images/projects/one-drop.jpg`, `movienest.jpg`, `mauve-studio.jpg`, etc.
  — export frames/mockups from Figma or Behance for each project, then in
  `index.html` replace the relevant `<div class="project-thumb" data-mock="...">`
  with `<img src="assets/images/projects/one-drop.jpg" alt="One Drop">` inside it.

## What's already wired up

- **CV download** — the "Download CV" button (header, hero, and contact
  section) downloads `Kaveen_Perera_CV_ProjectManager.pdf` automatically on
  click. The header also has a small dropdown to pick between your PM CV and
  your UI/UX Designer CV specifically.
- **Social buttons** — LinkedIn, Behance, email and phone icons in the hero
  and footer link straight to your profiles/contact (update the URLs in
  `index.html` if any of them change).
- **Animations** — staggered hero entrance, floating stat cards, a scrolling
  tools marquee, scroll-reveal on each section, a timeline that fills in as
  you scroll, and card hover lifts. All motion respects
  `prefers-reduced-motion` for accessibility.
- **Project filter** — "All Work / Case Studies / UI/UX Concepts" buttons
  filter the project grid instantly, no reload.

## Editing content

Everything is in plain HTML — open `index.html` in any text editor (VS Code
recommended) and search for the section you want to change (`<!-- ============
WORK / PROJECTS ============ -->` etc.). Colors and fonts are all defined once
at the top of `css/style.css` under `:root{ ... }` if you want to retheme.

---

## Hosting it for free

Any of these work well for a static site like this. **GitHub Pages** is
recommended since it's free, permanent, and gives you a clean URL you can
also point a custom domain at later.

### Option A — GitHub Pages (recommended)

1. Create a free GitHub account at github.com if you don't have one.
2. Create a new repository, e.g. `kaveen-portfolio` (keep it Public).
3. Upload this whole folder's contents to the repo — either drag-and-drop
   all files through the GitHub web UI ("Add file → Upload files"), or via
   git:
   ```
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/kaveen-portfolio.git
   git push -u origin main
   ```
4. In the repo, go to **Settings → Pages**.
5. Under "Build and deployment", set **Source: Deploy from a branch**,
   **Branch: main**, folder **/ (root)** → Save.
6. Wait 1–2 minutes. Your site goes live at:
   `https://<your-username>.github.io/kaveen-portfolio/`
7. (Optional) Add a custom domain later under the same Pages settings.

### Option B — Netlify (drag-and-drop, fastest)

1. Go to netlify.com and sign up free (GitHub login works).
2. On the dashboard, find "Add new site → Deploy manually".
3. Drag the entire `kaveen-portfolio` folder onto the upload box.
4. Netlify gives you a live URL immediately (e.g.
   `random-name-123.netlify.app`), which you can rename in Site settings.

### Option C — Vercel

1. Go to vercel.com, sign up free.
2. "Add New → Project → Deploy" and either connect the GitHub repo from
   Option A, or drag-and-drop the folder.
3. Vercel deploys it and gives you a live `.vercel.app` URL.

All three are free forever for a static site like this, support HTTPS
automatically, and redeploy instantly whenever you push new changes.
