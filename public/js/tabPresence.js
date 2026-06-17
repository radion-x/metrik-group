/* ──────────────────────────────────────────────
   METRIK GROUP — Tab Presence
   Animated favicon + refined title rotation
   ────────────────────────────────────────────── */
(function () {
  'use strict';

  // ── Colour palette ──
  var GOLD   = '#9B8060';
  var BLACK  = '#111111';
  var WHITE  = '#FFFFFF';
  var phases = [
    { bg: BLACK, stroke: GOLD  },
    { bg: GOLD,  stroke: WHITE },
    { bg: WHITE, stroke: BLACK }
  ];

  // ── Title phrases (understated, premium) ──
  var titles = [
    'Inbuilt Atelier',
    'Italian Joinery, Sydney',
    'Bespoke Wardrobes & Interiors',
    'Double Bay Showroom'
  ];

  var FAVICON_INTERVAL = 4000;   // 4s per colour phase
  var TITLE_INTERVAL   = 5000;   // 5s per title phrase
  var faviconIndex = 0;
  var titleIndex   = 0;
  var originalTitle = document.title;
  var canvas, ctx, link;
  var faviconTimer, titleTimer;

  function init() {
    canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    ctx = canvas.getContext('2d');

    // Find or create dynamic favicon link
    link = document.querySelector('link[rel="icon"][type="image/svg+xml"]')
        || document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    // Draw first frame immediately
    drawFavicon(phases[0]);

    // Start cycles
    faviconTimer = setInterval(cycleFavicon, FAVICON_INTERVAL);
    titleTimer   = setInterval(cycleTitle, TITLE_INTERVAL);

    // Pause when tab is hidden, resume when visible
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearInterval(faviconTimer);
        clearInterval(titleTimer);
      } else {
        faviconTimer = setInterval(cycleFavicon, FAVICON_INTERVAL);
        titleTimer   = setInterval(cycleTitle, TITLE_INTERVAL);
      }
    });
  }

  function drawFavicon(phase) {
    var bg = phase.bg;
    var s  = phase.stroke;

    ctx.clearRect(0, 0, 32, 32);

    // Background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 32, 32);

    // Outer frame (wardrobe outline)
    ctx.strokeStyle = s;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(3.5, 4, 25, 24, 0.5);
    ctx.stroke();

    // Centre divider
    ctx.beginPath();
    ctx.moveTo(16, 4);
    ctx.lineTo(16, 28);
    ctx.stroke();

    // Door handles
    ctx.fillStyle = s;
    ctx.beginPath();
    ctx.arc(13.5, 16, 1.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(18.5, 16, 1.4, 0, Math.PI * 2);
    ctx.fill();

    // Top rail (subtle)
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.moveTo(3.5, 7.5);
    ctx.lineTo(28.5, 7.5);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Apply to link
    link.type = 'image/png';
    link.href = canvas.toDataURL('image/png');
  }

  function cycleFavicon() {
    faviconIndex = (faviconIndex + 1) % phases.length;
    drawFavicon(phases[faviconIndex]);
  }

  function cycleTitle() {
    titleIndex = (titleIndex + 1) % titles.length;
    document.title = titles[titleIndex];
  }

  // ── Bootstrap ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
