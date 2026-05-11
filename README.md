# Inventory Control GitHub Website

Static front-end website for the Inventory Control / truck entry dashboard.

## Upload to GitHub Pages

Upload all files in this folder to the root of your GitHub repository. The main file must be named `index.html`.

Required files:
- `index.html`
- `login.html`
- `charts.html`
- `verify.html`
- `inventory.html`
- `style.css`
- `app.js`
- `sw.js`
- `manifest.json`
- `icon.png`
- `icon-512.png`
- `.nojekyll`

## Notes

This is a static client-side web project. It can be hosted on GitHub Pages. It connects to Firebase Realtime Database from `app.js`, so the website files are hosted on GitHub, while the database is cloud-based on Firebase.

Important: the admin username/password in `login.html` are front-end only and not secure for a public website. Use Firebase Authentication or stronger database rules if this will be public.
