(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function effective() {
    var t = root.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') return t;
    return mq.matches ? 'dark' : 'light';
  }
  function renderTheme() {
    var mode = effective();
    btn.dataset.mode = mode;
    btn.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
    btn.setAttribute('aria-label', mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  btn.addEventListener('click', function () {
    var next = effective() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    renderTheme();
  });
  if (mq.addEventListener) mq.addEventListener('change', renderTheme);
  renderTheme();

  // Menu: show one view at a time. About is the default.
  var views = Array.prototype.slice.call(document.querySelectorAll('main > section'));
  var links = Array.prototype.slice.call(document.querySelectorAll('nav a'));
  var ids = views.map(function (v) { return v.id; });

  function show() {
    var id = location.hash.replace('#', '');
    if (ids.indexOf(id) === -1) id = 'about';
    views.forEach(function (v) { v.hidden = v.id !== id; });
    links.forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    var title = document.getElementById(id).getAttribute('data-title');
    document.title = 'Aman Chauhan – ' + title;
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', show);
  show();
})();
