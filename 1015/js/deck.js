(function () {
  const stage = document.getElementById("stage");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const bar = document.querySelector("#progress i");
  const counter = document.getElementById("counter");
  const notes = document.getElementById("notes");
  const toc = document.getElementById("toc");
  const W = 1440;
  const H = 810;
  let i = 0;

  function fit() {
    const s = Math.min(window.innerWidth / W, window.innerHeight / H);
    stage.style.transform = "translate(-50%, -50%) scale(" + s + ")";
  }

  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (el, idx) {
      el.classList.toggle("active", idx === i);
    });
    stage.classList.toggle("title-on", slides[i].classList.contains("title"));
    bar.style.width = ((i + 1) / slides.length) * 100 + "%";
    counter.textContent = i + 1 + " / " + slides.length;
    notes.textContent = slides[i].dataset.notes || "本页无讲者备注。按 N 开关。";
    toc.classList.remove("open");
    history.replaceState(null, "", "#" + (i + 1));
  }

  function next() { show(i + 1); }
  function prev() { show(i - 1); }

  document.getElementById("btn-prev").addEventListener("click", prev);
  document.getElementById("btn-next").addEventListener("click", next);
  document.getElementById("btn-notes").addEventListener("click", function () {
    notes.classList.toggle("open");
  });
  document.getElementById("btn-toc").addEventListener("click", function () {
    toc.classList.toggle("open");
  });
  document.getElementById("btn-full").addEventListener("click", function () {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(function () {});
    else document.exitFullscreen();
  });

  document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      prev();
    } else if (e.key === "Home") show(0);
    else if (e.key === "End") show(slides.length - 1);
    else if (e.key === "n" || e.key === "N") notes.classList.toggle("open");
    else if (e.key === "m" || e.key === "M") toc.classList.toggle("open");
    else if (e.key === "Escape" && toc.classList.contains("open")) toc.classList.remove("open");
    else if (e.key === "f" || e.key === "F") {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(function () {});
      else document.exitFullscreen();
    }
  });

  toc.addEventListener("click", function (e) {
    const a = e.target.closest("a[data-go]");
    if (!a) return;
    e.preventDefault();
    show(Number(a.dataset.go));
  });

  window.addEventListener("resize", fit);
  fit();

  function goHash() {
    const n = Number((location.hash || "#1").slice(1));
    show(Number.isFinite(n) && n > 0 ? n - 1 : 0);
  }
  window.addEventListener("hashchange", goHash);
  goHash();
})();
