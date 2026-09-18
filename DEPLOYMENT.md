# Deployment Workflow

- Repository: `JamieP-205/local-web-fix`
- Production branch: `main`
- Netlify site: `localwebfix1`
- Production URL: `https://localwebfix.co.uk`
- Base directory: repository root
- Build command: `npm test`
- Publish directory: `.`
- Functions: none

GitHub is the source of truth. Pull requests and non-production branches use deploy previews, and pushes to `main` deploy the published portfolio concept.

The current site does not accept enquiries or payments. Local `.env` files, credentials and private material must never be committed.
