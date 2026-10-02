# Local Web Fix

[![CI](https://github.com/JamieP-205/local-web-fix/actions/workflows/ci.yml/badge.svg)](https://github.com/JamieP-205/local-web-fix/actions/workflows/ci.yml)

Published at [localwebfix.co.uk](https://localwebfix.co.uk/).

Local Web Fix is a portfolio concept for a small website-fix service. It is not an active business.

I first put this up in June 2026 as a small side service for local businesses, with a working enquiry form and Stripe payment links. Nobody enquired or paid, and in September 2026 I stopped offering it and turned the site into a portfolio concept. The form is now disabled and the prices are examples.

## The idea

The service was aimed at ordinary problems that make a small business harder to use online: inconsistent opening hours, buried menus, broken contact links, old booking pages and awkward mobile layouts.

I wanted the site to make the limits of the idea as clear as the offer itself. It avoids promises about rankings or sales and keeps larger work such as full rebuilds, e-commerce and complex booking systems outside the scope.

What I focused on:

- Writing down what the service would and wouldn't cover.
- Showing prices on the page, so the limits are clear before anyone reaches a form.
- Starting from public links. If a fix ever needed account access, it would use limited platform roles rather than shared passwords.
- A short route from spotting a problem to agreeing one small change.
- Being clear about what isn't real: the example business check is made up and the enquiry form is visibly disabled.

The styling borrows from the GOV.UK Design System because I wanted it to feel plain and easy to trust. It isn't affiliated with GOV.UK.

## How it's built

It is deliberately small: static HTML and CSS with a short JavaScript theme toggle. There is no framework, no backend and no payment flow.

I use AI tools as part of my development workflow for research, implementation support and code review. Some changes here were made by AI coding agents, including the October 2026 accessibility fixes, and the commit authors show which.

Main files:

- `index.html` - the homepage and the disabled example form
- `scope.html` - how the service scope could be explained
- `styles.css` - all the styles, including the portfolio-concept banner
- `theme.js` - light/dark theme toggle
- `tools/check-site.js` - structure, link and concept checks

## Running it

```bash
npm install
npm test
npx serve .
```

There is no build step. `npm test` checks the JavaScript syntax, the JSON files, the required pages and local links. It also fails if the concept banner goes missing, if the demo form is no longer disabled, or if anything that could take real enquiries or payments comes back (Netlify Forms attributes, a form that posts, a Stripe link).

## If I take it further

The useful next step would be testing the wording and flow with a few real small-business owners. That would show what is actually clear or confusing without pretending the concept already has customers or results.
