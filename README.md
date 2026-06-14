# Local Web Fix

[![CI](https://github.com/JamieP-205/local-web-fix/actions/workflows/ci.yml/badge.svg)](https://github.com/JamieP-205/local-web-fix/actions/workflows/ci.yml)

I created Local Web Fix as a small, student-run service for practical website and online-information improvements. It is aimed at UK local businesses that need focused fixes rather than a full redesign.

Live site: [localwebfix.co.uk](https://localwebfix.co.uk/)

## Why I Built It

Many small businesses already have a website, Google profile, menu, booking link, or social page, but customers still struggle to find basic information. I designed the service around those specific problems: opening hours, contact routes, mobile clarity, menus, prices, services, and inconsistent public details.

The site is intentionally honest about my level and scope. It does not use fake testimonials, promise rankings, or present the service as a large agency.

## What I Built

- A mobile-first service website with light and dark themes
- A Netlify Forms enquiry flow with required-field validation and a honeypot
- Clear pricing, scope, access-safety, and privacy information
- An unlisted payment page used only after a job scope is agreed
- A fictional example audit that is clearly labelled as an example
- Operational templates for audits, proposals, handovers, releases, and prospect tracking
- A custom 404 page, sitemap, robots file, web manifest, and social preview image

## Technical Approach

The project uses semantic HTML, CSS, and a small vanilla JavaScript theme controller. I avoided adding dependencies because the site does not need a framework or client-side application layer.

The enquiry form is handled by Netlify Forms. The form never asks for passwords or account credentials. If later work needs access, the process uses limited collaborator or manager permissions where the platform supports them.

## Project Structure

- `index.html` - homepage and enquiry form
- `privacy.html` - privacy information
- `scope.html` - service boundaries and terms
- `pay.html` - unlisted scope-confirmed payment links
- `theme.js` - persisted light/dark theme preference
- `docs/` - reusable operating templates and release notes
- `tools/check-site.js` - site and link validation

## Local Development

```bash
npm install
npm test
npx serve .
```

No build step is required. `npm test` checks JavaScript syntax, required files, metadata, local links, and the Netlify form configuration.

## Deployment Checks

After a Netlify deployment I:

1. submit a test enquiry
2. confirm it appears in Netlify Forms
3. verify the email notification
4. check the main information pages and a missing URL
5. confirm the payment page remains outside public navigation

See [SECURITY.md](SECURITY.md) for vulnerability reporting and [CONTRIBUTING.md](CONTRIBUTING.md) for the project rules.
