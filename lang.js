/**
 * Bilingual switcher — FR default, EN on toggle.
 * Reads data-fr / data-en attributes (text) or
 * data-fr-html / data-en-html (innerHTML) on any element.
 * Persists choice to localStorage across pages.
 */
(function () {
  var STORAGE_KEY = 'map_lang';
  var current = localStorage.getItem(STORAGE_KEY) || 'fr';

  function apply(lang) {
    current = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang === 'fr' ? 'fr-CA' : 'en-CA');

    // Text nodes
    document.querySelectorAll('[data-fr]').forEach(function (el) {
      el.textContent = lang === 'fr' ? el.dataset.fr : el.dataset.en;
    });

    // HTML nodes (for elements that contain tags like <em>, <strong>, <br>)
    document.querySelectorAll('[data-fr-html]').forEach(function (el) {
      el.innerHTML = lang === 'fr' ? el.dataset.frHtml : el.dataset.enHtml;
    });

    // Placeholders
    document.querySelectorAll('[data-fr-placeholder]').forEach(function (el) {
      el.placeholder = lang === 'fr' ? el.dataset.frPlaceholder : el.dataset.enPlaceholder;
    });

    // Update switcher button label
    var btn = document.getElementById('lang-switch');
    if (btn) btn.textContent = lang === 'fr' ? 'EN' : 'FR';
  }

  function toggle() {
    apply(current === 'fr' ? 'en' : 'fr');
  }

  // Apply on load
  document.addEventListener('DOMContentLoaded', function () {
    apply(current);
    var btn = document.getElementById('lang-switch');
    if (btn) btn.addEventListener('click', toggle);
  });
})();
