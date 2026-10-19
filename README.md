# Samantha M. — Portfolio

Static site (HTML + CSS + JavaScript + Bootstrap 5.3.3 / Bootstrap Icons 1.11.3 via CDN). No build step.

## Run
Open `index.html` in a browser (internet needed for Bootstrap CDN), or serve locally: `python3 -m http.server 8000` then visit http://localhost:8000
Deploy: upload the folder to GitHub Pages / Netlify as-is.

## Structure
- `index.html` — all sections (Home, About, Education, Skills, Learning, Courses, Projects, Resume, Contact)
- `css/style.css` — design tokens + styles · `js/main.js` — behaviour · `js/data.js` — **edit profile & course data here**
- `assets/profile/samantha.jpg` (optimised from the uploaded photo) · `assets/documents/Samantha_M_Resume.pdf` (original resume)

## Notes / limitations
- Skills are shown as "listed on resume, not yet verified". Courses are personal learning plans; Completed only when you set it in `data.js`.
- Contact form opens the visitor's email app (mailto). A static site cannot store messages or run a secure inbox; that needs a backend (e.g. Express + database + authentication), which is not included.
- Cursor effect is desktop-only, optional (toggle in nav), and off with reduced-motion.
