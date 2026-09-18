# Local Web Fix

[![CI](https://github.com/JamieP-205/local-web-fix/actions/workflows/ci.yml/badge.svg)](https://github.com/JamieP-205/local-web-fix/actions/workflows/ci.yml)

Published at [localwebfix.co.uk](https://localwebfix.co.uk/).

Local Web Fix is a **portfolio business concept**, not an active service. I built it to practise turning a small local-business web-service idea into a complete public website with clear scope, example pricing, a simple enquiry journey and safe-access guidance.

## The idea

The mock service focuses on ordinary problems that can make a small business harder to use online: inconsistent opening hours, buried menus, broken contact links, old booking pages and awkward mobile layouts.

I wanted the site to make the limits of the idea as clear as the offer itself. It avoids promises about rankings or sales and keeps larger work such as full rebuilds, e-commerce and complex booking systems outside the example scope.

## What I focused on

- **Clear scope** - what the example service would and would not cover.
- **Example pricing** - visible packages used to practise explaining limits before somebody reaches a form.
- **Safe access** - public links first, then limited platform permissions if a hypothetical fix needed access.
- **Customer journey** - a short path from the problem to an agreed small change.
- **Honest evidence** - the example business check is fictional and the enquiry form is visibly disabled.

## Implementation

The project is deliberately small: static HTML and CSS with a short JavaScript theme toggle. There is no application framework or live payment flow.

Main files:

- `index.html` - the main concept site and disabled example form
- `scope.html` - an example of how the service scope could be explained
- `theme.js` - light/dark theme handling
- `concept-note.css` - styles for the visible portfolio-concept notice
- `tools/check-site.js` - basic structure and local-link checks

## Running it

```bash
npm install
npm test
npx serve .
```

There is no build step. The checks validate the JavaScript, JSON, required pages and local links.

## If I take it further

The useful next step would be testing the wording and flow with a few real small-business owners. That would show what is actually clear or confusing without pretending the concept already has customers or results.
