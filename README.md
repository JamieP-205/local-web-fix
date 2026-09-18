# Local Web Fix

[![CI](https://github.com/JamieP-205/local-web-fix/actions/workflows/ci.yml/badge.svg)](https://github.com/JamieP-205/local-web-fix/actions/workflows/ci.yml)

Published at [localwebfix.co.uk](https://localwebfix.co.uk/).

Local Web Fix is a **portfolio business concept**, not an active service I am currently operating. I built it to practise turning a small local-business web-service idea into a believable public website with clear scope, example pricing, an enquiry flow, safe-access guidance and a mobile-first layout.

## The idea

The mock service is based on ordinary problems that can make a small business harder to use online: inconsistent opening hours, buried menus, broken contact links, old booking pages or awkward mobile layouts.

The site explores how I would explain a deliberately narrow offer without pretending every problem needs a rebuild.

## What I focused on

- **Clear scope.** The site says what the example service would and would not cover.
- **Example pricing.** The £50, £100 and £150 packages are part of the concept rather than evidence of completed client work.
- **Safe access.** The copy tells users not to send passwords and models limited collaborator/manager access instead.
- **A realistic enquiry journey.** The form remains visible as a design example but is disabled on the published site because I am not currently taking work through it.
- **Honest evidence.** The example check is fictional and labelled as such.

## The code is deliberately simple

It is mainly HTML and CSS with a small JavaScript theme toggle and concept-state handling. There is no framework or unnecessary backend.

Main files:

- `index.html` - the business-site concept and example enquiry flow
- `scope.html` - example scope and terms
- `privacy.html` - example privacy information
- `pay.html` - unlisted/noindex payment-flow page retained as part of the concept
- `theme.js` - light/dark theme plus the published concept framing
- `concept-note.css` - small styles for the concept notice
- `tools/check-site.js` - CI checks for pages, links and site structure

## Running it

```bash
npm install
npm test
npx serve .
```

There is no build step. The automated checks parse the JavaScript, verify required pages and local links, and validate the static site structure.

## If I take it further

The useful next step would be testing the wording and flow with a few real small-business owners. That would give me evidence about what is clear or confusing without pretending the concept already has clients or results.
