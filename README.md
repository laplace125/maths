# AKANO Maths Corner

A static website (HTML, CSS and a little JavaScript) that works on free GitHub Pages hosting.

## Files

- `index.html` – the whole site (Home, Quizzes, How it works, About)
- `style.css` – design
- `script.js` – warm-up question, click-to-load videos, footer year

## Publish on GitHub Pages

1. Sign in at github.com and click **New repository**.
2. Name it. For an address like `https://your-username.github.io/`, name it exactly `your-username.github.io`. Any other name gives `https://your-username.github.io/repo-name/`. Both work, because every path in this site is relative.
3. Set the repository to **Public** (free accounts need this for Pages).
4. Click **Add file → Upload files**, drag in `index.html`, `style.css`, `script.js` and `README.md`, then **Commit changes**.
5. Open **Settings → Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose branch `main` and folder `/ (root)`, then **Save**.
6. Wait 1–2 minutes. Your site address appears at the top of the Pages settings. Tick **Enforce HTTPS** if it isn't already on.

## Add a new topic

In `index.html`, find the `<article class="sheet topic">` blocks. Copy one, then change:

- the title (`Indices 1`)
- the quiz link (`href`)
- the video ID in `data-video` (the part after `youtu.be/`)
- the "Open on YouTube" link

## GitHub Pages limits to remember

- Static files only (no PHP, no databases).
- Repository under about 1 GB, published site under 1 GB, single files under 100 MB.
- Soft bandwidth limit of about 100 GB per month.
- Not for running an online business or collecting sensitive data.
