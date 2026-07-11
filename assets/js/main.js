(function () {
  "use strict";

  // --- Tag filter -----------------------------------------------------
  var chips = document.querySelectorAll("#filter-chips .chip");
  var cards = document.querySelectorAll(".card");

  function applyFilter(tag) {
    cards.forEach(function (card) {
      var tags = (card.getAttribute("data-tags") || "").split(",");
      var show = tag === "all" || tags.indexOf(tag) !== -1;
      card.classList.toggle("is-hidden", !show);
    });

    // Hide a module entirely if every card inside it is filtered out.
    document.querySelectorAll(".module").forEach(function (module) {
      var visible = module.querySelectorAll(".card:not(.is-hidden)").length;
      module.style.display = visible ? "" : "none";
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      applyFilter(chip.getAttribute("data-tag"));
    });
  });

  // --- Ticker sizing ----------------------------------------------------
  // The CSS scroll animation needs to know how many lines it's moving past.
  // Set a CSS custom property with the real line count instead of hardcoding
  // it, so adding/removing "highlight" projects in _data/projects.yml just
  // works without touching CSS.
  var ticker = document.getElementById("build-ticker");
  if (ticker) {
    var lines = ticker.querySelectorAll(".ticker__lines li").length;
    if (lines > 0) {
      ticker.style.setProperty("--ticker-h", lines);
    }
  }
})();
