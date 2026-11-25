# Personal Portfolio

A responsive, one-page student portfolio with a pink-and-black CSS gradient background, a desktop sidebar and mobile navigation drawer, translucent cards, and vanilla HTML, CSS, and JavaScript.

## Run locally

Open `index.html` in a browser. No build step or backend is required. An internet connection is only needed to load the optional Google Fonts; system fallbacks are included.

## Edit your content

Open `index.html` to update the name, school, bio, project descriptions, experience, email, and social profile URLs. Replace `YOUR_USERNAME` in each project card's `href` with your GitHub username, then update the repository name or use your live project URL. Also update the page title and Open Graph description in the `<head>`.

## Change colors

Open `style.css` and edit the CSS variables at the top:

- `--bg`: page background
- `--surface`: translucent card background
- `--fg`: main text color
- `--muted`: secondary text
- `--accent`: pink highlight color

The light theme variables are in `[data-theme="light"]`. The theme toggle saves the preference in browser storage when available.

## Deploy free with GitHub Pages

1. Create a GitHub repository (for example, `my-portfolio`).
2. Upload `index.html`, `style.css`, `script.js`, the `assets` folder, and this README to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then click **Save**.
6. Wait for GitHub Pages to publish the site. Your URL will look like `https://YOUR-USERNAME.github.io/my-portfolio/`.

The background colors are created entirely with CSS gradients; no background image is used. The hero illustration and project previews are also made with CSS. All portfolio content is editable in `index.html`.
