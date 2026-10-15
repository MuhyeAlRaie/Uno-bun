/* ==========================================================================
   UNO BUN — menu.js
   Menu page category filter. Progressive enhancement:
   - Without JavaScript the tab buttons are plain anchors that scroll to
     each category section, and every section stays visible.
   - With JavaScript the buttons filter the visible sections.
   ========================================================================== */
(function () {
  "use strict";

  var tabs = document.querySelectorAll("[data-menu-filter]");
  var sections = document.querySelectorAll("[data-menu-category]");

  if (!tabs.length || !sections.length) { return; }

  function activate(value) {
    tabs.forEach(function (tab) {
      var active = tab.getAttribute("data-menu-filter") === value;
      tab.setAttribute("aria-pressed", active ? "true" : "false");
    });
    sections.forEach(function (section) {
      var show = value === "all" ||
        section.getAttribute("data-menu-category") === value;
      section.hidden = !show;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      activate(tab.getAttribute("data-menu-filter"));
    });
  });

  /* Initial state: everything visible, "all" pressed */
  activate("all");
})();
