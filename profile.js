// Shows a random profile photo on each page load.
// Add or remove file names here; any file that is missing is skipped,
// so a name listed before its image exists does no harm.
(function () {
  var PHOTOS = [
    'media/profile.jpeg',
    'media/profile2.jpeg',
    'media/profile3.jpeg',
    'media/profile4.jpeg'
  ];

  function start() {
    var img = document.getElementById('avatar');
    if (!img || PHOTOS.length < 2) return;

    // Random order, then use the first one that actually loads.
    var queue = PHOTOS.slice();
    for (var i = queue.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = queue[i]; queue[i] = queue[j]; queue[j] = t;
    }

    (function tryNext() {
      if (!queue.length) return;            // none loaded: keep what the HTML has
      var src = queue.shift();
      var probe = new Image();
      probe.onload = function () { img.src = src; img.style.visibility = 'visible'; };
      probe.onerror = tryNext;
      probe.src = src;
    })();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
