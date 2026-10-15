/* ==========================================================================
   UNO BUN — common.js
   Shared UI behaviour: mobile navigation, sticky header state,
   scroll-reveal animations, auto year. Progressive enhancement only —
   every feature degrades safely without JavaScript.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------ mobile navigation --- */
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");

  function closeNav() {
    if (!document.body.classList.contains("nav-open")) { return; }
    document.body.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    /* Close when a nav link is chosen */
    siteNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { closeNav(); }
    });

    /* Close with Escape and return focus to the toggle */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeNav(); }
    });

    /* Reset state when returning to desktop layout */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 920) { closeNav(); }
    });
  }

  /* ------------------------------------------------ sticky header shadow */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* --------------------------------------------------- scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealEls.length && "IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ----------------------------------------------------- footer year ---- */
  var yearEls = document.querySelectorAll("[data-year]");
  var y = String(new Date().getFullYear());
  yearEls.forEach(function (el) { el.textContent = y; });
})();
