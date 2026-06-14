# Setup notes

## Netlify Forms

The form name is `quick-review`. It uses standard Netlify static form handling with `data-netlify="true"`, a hidden `form-name`, a honeypot field, and a custom success page at `/thanks.html`.

After deploying, go to Netlify → Forms and confirm `quick-review` appears. Then add an email notification to `hello@localwebfix.co.uk`.

If you reach the thank-you page but no email arrives, check Netlify Forms submissions first. Email notifications are not guaranteed until they are configured in Netlify project notification settings.


## Netlify email notifications

A successful submit can redirect to `/thanks.html` without sending an email. Netlify stores submissions in the Forms dashboard, but email notifications must be added separately in Project configuration → Notifications → Emails and webhooks → Form submission notifications. Send them to `hello@localwebfix.co.uk`.
