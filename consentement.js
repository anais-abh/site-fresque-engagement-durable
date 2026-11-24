/* Consentement cookies + Google Tag Manager (GTM-KMM4XJLQ).
   GTM (et donc Analytics, Clarity, pixel Meta…) n'est chargé qu'après un clic sur « Accepter ».
   Choix conservé 6 mois. */
(function () {
  var GTM = 'GTM-KMM4XJLQ', CLE = 'fed-consentement', DUREE = 182 * 24 * 3600 * 1000;
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });

  function lire() {
    try { var c = JSON.parse(localStorage.getItem(CLE)); if (c && Date.now() - c.t < DUREE) return c.v; } catch (e) {}
    return null;
  }
  function ecrire(v) { try { localStorage.setItem(CLE, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {} }

  var charge = false;
  function chargerGTM() {
    if (charge) return; charge = true;
    gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
    dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM;
    document.head.appendChild(s);
  }

  function bandeau() {
    if (document.getElementById('fed-cc')) return;
    var st = document.createElement('style');
    st.textContent = '#fed-cc{position:fixed;left:16px;bottom:16px;z-index:9999;max-width:360px;background:#fff;border:1px solid #EFE6E1;border-radius:18px;padding:18px 18px 16px;box-shadow:0 14px 36px rgba(0,0,0,.14);font-family:Montserrat,system-ui,sans-serif;color:#1D1D1B;font-size:.84rem;line-height:1.5}'
      + '#fed-cc b{display:block;font-weight:800;font-size:.95rem;margin-bottom:6px;color:#C94A1C}'
      + '#fed-cc a{color:#C94A1C;font-weight:700;text-decoration:underline}'
      + '#fed-cc .r{display:flex;gap:8px;margin-top:14px}'
      + '#fed-cc button{flex:1;padding:9px 12px;border-radius:999px;font:700 .8rem Montserrat,system-ui,sans-serif;cursor:pointer;border:2px solid #F06432}'
      + '#fed-cc .a{background:#F06432;color:#fff}#fed-cc .n{background:#fff;color:#C94A1C}'
      + '@media(max-width:520px){#fed-cc{left:10px;right:10px;bottom:10px;max-width:none}}';
    document.head.appendChild(st);
    var d = document.createElement('div');
    d.id = 'fed-cc'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Cookies');
    d.innerHTML = '<b>Des cookies pour améliorer le site</b>Avec votre accord, nous mesurons la fréquentation et l’usage du site (Google Analytics, Microsoft Clarity) et l’efficacité de nos publicités (Meta). <a href="/cookies/">En savoir plus</a>'
      + '<div class="r"><button type="button" class="n">Refuser</button><button type="button" class="a">Accepter</button></div>';
    d.querySelector('.a').onclick = function () { ecrire('oui'); d.remove(); chargerGTM(); };
    d.querySelector('.n').onclick = function () { ecrire('non'); d.remove(); };
    document.body.appendChild(d);
  }

  window.gererCookies = function () { try { localStorage.removeItem(CLE); } catch (e) {} if (charge) { location.reload(); return; } bandeau(); };

  var choix = lire();
  if (choix === 'oui') chargerGTM();
  else if (choix === null) {
    if (document.body) bandeau(); else document.addEventListener('DOMContentLoaded', bandeau);
  }
})();
