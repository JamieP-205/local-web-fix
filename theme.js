(function () {
  var button = document.querySelector('[data-theme-toggle]');
  var label = document.querySelector('[data-theme-label]');
  var root = document.documentElement;
  var storageKey = 'local-web-fix-theme';

  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (button && label) {
      var next = theme === 'dark' ? 'Light' : 'Dark';
      label.textContent = next;
      button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      button.setAttribute('aria-label', 'Switch to ' + next.toLowerCase() + ' theme');
    }
  }

  function setText(selector, value) {
    var element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function frameAsConcept() {
    document.title = 'Local Web Fix | Portfolio Business Concept by Jamie Parr';
    var description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', 'A portfolio concept by Jamie Parr exploring a small fixed-scope web service for local businesses. Published as a demonstration, not an active business.');
    }

    if (!document.querySelector('link[href="/concept-note.css"]')) {
      var stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = '/concept-note.css';
      document.head.appendChild(stylesheet);
    }

    var header = document.querySelector('.site-header');
    if (header && !document.querySelector('.concept-banner')) {
      var banner = document.createElement('div');
      banner.className = 'concept-banner';
      banner.setAttribute('role', 'note');
      banner.innerHTML = '<div class="container"><p><strong>Portfolio concept.</strong> I built Local Web Fix as a realistic business-website project. It is not an active service and I am not currently taking enquiries through it.</p></div>';
      header.insertAdjacentElement('afterend', banner);
    }

    setText('.hero .eyebrow', 'Portfolio concept for a local-business web service');
    setText('.hero .hero-lede', 'This published demo explores how a small web service could explain its scope, pricing, customer journey and safe-access rules clearly.');
    setText('.hero .quiet-line', 'Built by Jamie Parr, a Computing Technologies student in Belfast, as a portfolio project rather than an active business.');

    var trust = document.querySelectorAll('.hero .trust-row span');
    if (trust[0]) trust[0].textContent = 'Portfolio concept';
    if (trust[1]) trust[1].textContent = 'Published demo';
    if (trust[2]) trust[2].textContent = 'Not accepting work';

    var heroButtons = document.querySelectorAll('.hero .hero-actions .btn');
    if (heroButtons[0]) heroButtons[0].textContent = 'See example enquiry flow';
    if (heroButtons[1]) heroButtons[1].textContent = 'See example pricing';

    setText('#pricing .eyebrow', 'Example pricing');
    setText('#pricing .section-head h2', 'Example packages for the concept.');
    setText('#pricing .section-head > p:last-child', 'These prices are part of the mock service design and are shown to demonstrate how I would make scope and expectations clear.');

    var pricingLinks = document.querySelectorAll('#pricing .price-card .btn');
    pricingLinks.forEach(function (link) {
      link.textContent = 'View example flow';
    });

    setText('#process .section-head h2', 'A possible customer flow.');
    setText('#about h2', 'Built by Jamie as a portfolio concept.');
    var aboutParagraphs = document.querySelectorAll('#about > .container > div:last-child > p:not(.eyebrow)');
    if (aboutParagraphs[0]) aboutParagraphs[0].textContent = 'I am Jamie Parr, a Computing Technologies student at Ulster University in Belfast. I built this site to practise designing a believable small-business service around clear scope, careful access and straightforward communication.';
    if (aboutParagraphs[1]) aboutParagraphs[1].textContent = 'The site is published so the project can be inspected, but Local Web Fix is not currently operating as a business and the examples on the site are demonstrations.';

    setText('#quick-review .eyebrow', 'Example enquiry flow');
    setText('#quick-review h2', 'What an enquiry form could look like.');
    var formIntro = document.querySelector('#quick-review .form-layout > div > p:nth-of-type(2)');
    if (formIntro) formIntro.textContent = 'This form is kept on the page as part of the portfolio demo. It is not currently used to take work.';

    var form = document.querySelector('form[name="quick-review"]');
    if (form) {
      form.classList.add('is-demo');
      form.setAttribute('aria-disabled', 'true');
      form.setAttribute('inert', '');
      form.querySelectorAll('input, textarea, select, button').forEach(function (control) {
        control.disabled = true;
      });
      var submit = form.querySelector('button[type="submit"]');
      if (submit) submit.textContent = 'Demo only - not accepting enquiries';
      var note = form.querySelector('.form-note');
      if (note) {
        note.classList.add('demo-only-note');
        note.textContent = 'The fields are disabled because this is now a portfolio concept rather than an active service.';
      }
    }
  }

  try {
    applyTheme(localStorage.getItem(storageKey) || systemTheme());
  } catch (error) {
    applyTheme(systemTheme());
  }

  if (button) {
    button.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || systemTheme();
      var next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(storageKey, next);
      } catch (error) {}
      applyTheme(next);
    });
  }

  frameAsConcept();
}());
