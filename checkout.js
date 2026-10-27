// checkout.js — wires [data-checkout-product] buttons to Waffo Pancake hosted checkout.
// Store Slug auth (public, client-safe): price/tax come from the product record server-side,
// so nothing here can tamper with pricing.
// NOTE: session create goes through our own origin (/api/checkout-session, nginx proxy to
//       api.waffo.ai). Direct browser->api.waffo.ai fetch failed for mainland-CN visitors
//       (Vercel edge unstable from CN, 2026-10-27) — same-origin also drops the CORS preflight.
//       The checkout PAGE itself (pancake.waffo.ai) is still a top-level redirect.
(function () {
  var STORE_SLUG = 'cozy-line-studio-fgd6wnqm';
  var ENV = 'prod'; // KYC 已过(2026-10-26), 生产模式
  var API = '/api/checkout-session';

  document.querySelectorAll('[data-checkout-product]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (btn.dataset.busy) return;
      btn.dataset.busy = '1';
      var original = btn.textContent;
      btn.textContent = 'Opening secure checkout…';
      fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Store-Slug': STORE_SLUG,
          'X-Environment': ENV
        },
        body: JSON.stringify({
          productId: btn.getAttribute('data-checkout-product'),
          currency: 'USD',
          language: 'en'
        })
      })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          var url = j && j.data && j.data.checkoutUrl;
          if (!url) throw new Error(JSON.stringify(j));
          window.location.href = url;
        })
        .catch(function (err) {
          delete btn.dataset.busy;
          btn.textContent = original;
          console.error('checkout error', err);
          window.alert("Couldn't open checkout — please try again, or email wyyxdgm@163.com.");
        });
    });
  });
})();
