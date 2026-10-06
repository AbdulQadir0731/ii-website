// ii pre-launch site: allowance illustration + animation pause. No network requests.
(function () {
  "use strict";
  var fmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

  // Planned rule: allowance = min(score × 1,000, 100,000); available = max(0, allowance − unreturned).
  var score = document.getElementById("s-score");
  var out = document.getElementById("s-out");
  if (score && out) {
    var oScore = document.getElementById("o-score");
    var oOut = document.getElementById("o-out");
    var rAllow = document.getElementById("r-allow");
    var rAvail = document.getElementById("r-avail");
    var update = function () {
      var s = Number(score.value);
      var u = Number(out.value);
      var allow = Math.min(Math.round(s * 100) * 10, 100000); // exact for a 0.01 step (avoids float error)
      var avail = Math.max(0, allow - u);
      oScore.textContent = s.toFixed(2);
      oOut.textContent = fmt.format(u) + " ii";
      rAllow.textContent = fmt.format(allow) + " ii";
      rAvail.textContent = fmt.format(avail) + " ii";
      out.setAttribute("aria-valuetext", fmt.format(u) + " ii");
      score.setAttribute("aria-valuetext", s.toFixed(2));
      score.style.setProperty("--p", s + "%");
      out.style.setProperty("--p", (u / 1000) + "%");
    };
    score.addEventListener("input", update);
    out.addEventListener("input", update);
    update();
  }

  var btn = document.getElementById("pause");
  var cycle = document.getElementById("cycle");
  if (btn && cycle) {
    btn.addEventListener("click", function () {
      var paused = cycle.classList.toggle("paused");
      btn.setAttribute("aria-pressed", paused ? "true" : "false");
      btn.textContent = paused ? "Play animation" : "Pause animation";
    });
  }
})();
