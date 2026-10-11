(function () {
  function setup(tabsEl) {
    var scope = tabsEl.parentElement;
    var tabs = tabsEl.querySelectorAll('.tab');
    var items = scope.querySelectorAll('[data-cat]');
    var empty = scope.querySelector('#no-match, .no-match');

    function apply(filter) {
      var shown = 0;
      items.forEach(function (item) {
        var cats = (item.getAttribute('data-cat') || '').split(/\s+/);
        var match = filter === 'all' || cats.indexOf(filter) !== -1;
        item.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var f = tab.getAttribute('data-filter');
        apply(f);
        history.replaceState(null, '', f === 'all' ? location.pathname : '#' + f);
      });
    });

    // Open on the category named in the URL, e.g. projects.html#vr
    var start = (location.hash || '').replace('#', '');
    var startTab = start && tabsEl.querySelector('.tab[data-filter="' + start + '"]');
    if (startTab) startTab.click();
  }

  document.querySelectorAll('.tabs').forEach(setup);
})();
