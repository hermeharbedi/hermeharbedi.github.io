// Category tabs on the Projects page: show only the cards whose data-cat
// contains the selected category. "all" shows everything.
(function () {
  var tabs = document.querySelectorAll('.tab');
  var cards = document.querySelectorAll('.project[data-cat]');
  var empty = document.getElementById('no-match');

  function apply(filter) {
    var shown = 0;
    cards.forEach(function (card) {
      var cats = (card.getAttribute('data-cat') || '').split(/\s+/);
      var match = filter === 'all' || cats.indexOf(filter) !== -1;
      card.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      apply(tab.getAttribute('data-filter'));
      // Keep the chosen category in the URL so the view can be linked and refreshed.
      var f = tab.getAttribute('data-filter');
      history.replaceState(null, '', f === 'all' ? location.pathname : '#' + f);
    });
  });

  // Open on the category named in the URL, e.g. projects.html#vr
  var start = (location.hash || '').replace('#', '');
  var startTab = document.querySelector('.tab[data-filter="' + start + '"]');
  if (startTab) startTab.click();
})();
