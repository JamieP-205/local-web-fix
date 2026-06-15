# Deployment Workflow

- Repository: `JamieP-205/local-web-fix`
- Production branch: `main`
- Netlify site: `localwebfix1`
- Production URL: `https://localwebfix.co.uk`
- Base directory: repository root
- Build command: `npm test`
- Publish directory: `.`
- Functions: none

GitHub is the source of truth. Pull requests and non-production branches use deploy previews;
pushes to `main` deploy to the existing production site.

The Netlify Forms configuration and notification settings remain attached to the existing site.
Local `.env` files, credentials and private client material must never be committed.
