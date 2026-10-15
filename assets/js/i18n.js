/* ==========================================================================
   UNO BUN — i18n.js
   Lightweight static language switcher (Arabic default / English).
   ---------------------------------------------------------------
   How it works
   - Page markup contains BOTH languages side by side:
       <span class="lang-ar">نص عربي</span><span class="lang-en">English</span>
     CSS shows the active one (html[lang="ar"] / html[lang="en"]).
   - For attributes (<title>, meta description, input placeholder,
     aria-label, alt...) use:
       data-ar="..." data-en="..." data-attrs="placeholder,aria-label"
   - Without JavaScript the Arabic default renders and the site
     stays fully usable.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "uno-bun-lang";
  var DEFAULT_LANG = "ar";           /* Arabic is the brand default */
  var SUPPORTED = ["ar", "en"];

  function currentLang() {
    var l = document.documentElement.getAttribute("lang");
    return SUPPORTED.indexOf(l) !== -1 ? l : DEFAULT_LANG;
  }

  function applyAttributeLang(lang) {
    /* Swap attribute values declared via data-ar / data-en + data-attrs */
    var nodes = document.querySelectorAll("[data-attrs]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var attrs = (el.getAttribute("data-attrs") || "").split(",");
      var value = lang === "en" ? el.getAttribute("data-en") : el.getAttribute("data-ar");
      if (!value) { continue; }
      for (var a = 0; a < attrs.length; a++) {
        var name = attrs[a].trim();
        if (!name) { continue; }
        if (name === "text") {
          /* Swap the element's text content (used for <option>, <title>) */
          el.textContent = value;
        } else {
          el.setAttribute(name, value);
        }
      }
    }
    /* <title> declared with data-attrs="text" */
    var titles = document.querySelectorAll("title[data-attrs]");
    for (var t = 0; t < titles.length; t++) {
      var title = titles[t];
      var tv = lang === "en" ? title.getAttribute("data-en") : title.getAttribute("data-ar");
      if (tv) { title.textContent = tv; }
    }
  }

  function apply(lang, persist) {
    lang = SUPPORTED.indexOf(lang) !== -1 ? lang : DEFAULT_LANG;
    var root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    applyAttributeLang(lang);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
    }
    /* Let other scripts react (e.g. forms.js mailto language) */
    document.dispatchEvent(new CustomEvent("unolangchange", { detail: { lang: lang } }));
  }

  function init() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    apply(saved || DEFAULT_LANG, false);

    /* Wire every language toggle button */
    var toggles = document.querySelectorAll("[data-lang-toggle]");
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener("click", function () {
        apply(currentLang() === "ar" ? "en" : "ar", true);
      });
    }
  }

  /* Public mini-API */
  window.UNOI18N = {
    init: init,
    apply: apply,
    current: currentLang
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
