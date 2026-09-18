# Local Web Fix

[![CI](https://github.com/JamieP-205/local-web-fix/actions/workflows/ci.yml/badge.svg)](https://github.com/JamieP-205/local-web-fix/actions/workflows/ci.yml)

Live at [localwebfix.co.uk](https://localwebfix.co.uk/).

A small service site. Local businesses send me a link to their website, Google listing or Facebook page, and I check whether a customer can actually find the basics: opening hours, the menu, a phone number that works on a phone, a booking link that is not dead.

## Why I built it

Most small businesses do not need a rebuild. They need the details customers rely on to be correct and easy to find. This is my attempt to offer that smaller practical service while I build experience alongside university.

## The code is deliberately simple

It is HTML, CSS and a theme toggle. The work went into the wording:

- **Pricing is on the page.** Free check, then £50, £100 or £150 with what each includes. No "contact us for a quote".
- **The scope page says what I will not do.** No SEO campaigns, no payment systems, no plugin surgery. If another provider manages the site, I hand over notes rather than trying to take over.
- **No passwords, ever.** The first check uses public links only. If a fix needs access later, it goes through proper collaborator or manager permissions. I am a student, and I should not be holding the logins to somebody's livelihood.
- **The example check is labelled fictional**, because it is. It stays that way until a real business is happy for me to publish theirs.

## Files

- `index.html` the whole pitch, and the enquiry form
- `scope.html` what is and is not included
- `privacy.html` what happens to what people send me
- `pay.html` payment links, unlisted and `noindex`, only sent once a scope is agreed
- `theme.js` light/dark toggle, saved in localStorage
- `docs/` templates I use for the actual work: audits, proposals, handovers
- `tools/check-site.js` the checks CI runs

## Running it

```bash
npm install
npm test
npx serve .
```

No build step. `npm test` parses the JavaScript, checks that required pages exist, verifies local links with exact filename casing and validates the full Netlify form setup. The form is the main conversion point, and a missing attribute can stop submissions without breaking the rest of the page.

## Gotchas

- The form is Netlify Forms, so it only works on a Netlify deploy. It does nothing on `npx serve`.
- Reaching the thanks page does not prove an email went out. Netlify stores the submission either way, while email notifications are configured separately in the Netlify dashboard.
- `pay.html` is deliberately not in the navigation or the sitemap. Do not link it.

## Next

- A real example report, once a client is happy for me to publish one
- Feedback after a finished job, so I have something better than my own opinion of how it went
