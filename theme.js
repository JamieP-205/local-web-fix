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
