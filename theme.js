(function () {
  var button = document.querySelector('[data-theme-toggle]');
  var root = document.documentElement;
  var storageKey = 'local-web-fix-theme';

  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // The button is always labelled "Dark theme"; only aria-pressed changes.
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (button) {
      button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
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
}());
