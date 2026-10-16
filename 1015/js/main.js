(function () {
  const progress = document.querySelector("#progress > i");
  const notesPanel = document.getElementById("notes-panel");
  const fab = document.getElementById("fab-top");
  const navLinks = Array.from(document.querySelectorAll(".nav a[href^='#']"));
  const chapters = navLinks
    .map(function (a) {
      return document.querySelector(a.getAttribute("href"));
    })
    .filter(Boolean);

  function onScroll() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const p = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    progress.style.width = p + "%";
    fab.classList.toggle("show", doc.scrollTop > 480);

    let current = chapters[0];
    for (let i = 0; i < chapters.length; i++) {
      if (chapters[i].getBoundingClientRect().top <= 120) current = chapters[i];
    }
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current.id);
    });

    if (document.body.classList.contains("notes-on")) {
      const note = current.getAttribute("data-notes") || "本页无额外备注。";
      notesPanel.innerHTML = "<strong>" + (current.querySelector("h2")?.textContent || "") + "</strong><br>" + note;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.getElementById("btn-notes")?.addEventListener("click", function () {
    document.body.classList.toggle("notes-on");
    onScroll();
  });

  document.getElementById("btn-fullscreen")?.addEventListener("click", function () {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(function () {});
    else document.exitFullscreen();
  });

  fab?.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("keydown", function (e) {
    if (["INPUT", "TEXTAREA", "BUTTON"].indexOf(e.target.tagName) >= 0 && e.target.tagName !== "BODY") {
      if (e.target.tagName === "BUTTON") {
        /* allow global keys except when typing */
      } else return;
    }
    if (e.key === "n" || e.key === "N") {
      document.body.classList.toggle("notes-on");
      onScroll();
    } else if (e.key === "f" || e.key === "F") {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(function () {});
      else document.exitFullscreen();
    } else if (e.key === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  /* ---- Pipeline demo ---- */
  (function () {
    const boxes = document.querySelectorAll("#demo-pipeline .box");
    const status = document.querySelector("#demo-pipeline .status");
    const texts = [
      "连接管理：为会话分配线程，完成用户认证。",
      "解析：把 SQL 文本变成表、列、条件等内部结构。",
      "优化：规则改写 + 成本比较，产出执行计划。",
      "存储引擎：按计划调用 InnoDB API，读写 16KB 页。",
      "结果返回客户端。一次查询走完这四截。"
    ];
    let i = -1;
    function paint() {
      boxes.forEach(function (el, idx) {
        el.classList.toggle("on", idx === i);
        el.classList.toggle("dim", i >= 0 && idx > i);
      });
      status.textContent = i < 0 ? "点击「下一步」按请求处理路径走一遍。" : texts[i];
    }
    document.querySelector("#demo-pipeline .next")?.addEventListener("click", function () {
      i = Math.min(texts.length - 1, i + 1);
      paint();
    });
    document.querySelector("#demo-pipeline .prev")?.addEventListener("click", function () {
      i = Math.max(-1, i - 1);
      paint();
    });
    document.querySelector("#demo-pipeline .reset")?.addEventListener("click", function () {
      i = -1;
      paint();
    });
    paint();
  })();

  /* ---- Page layer demo ---- */
  (function () {
    const layers = document.querySelectorAll("#demo-page .page-stack > div");
    const detail = document.querySelector("#demo-page .detail");
    const map = {
      fh: "File Header（38B）：页号、前后页、页类型、校验和、LSN。所有页通用。",
      ph: "Page Header（56B）：槽数、堆顶、记录数、垃圾空间、插入方向等数据页状态。",
      is: "Infimum / Supremum（26B）：页内虚拟最小/最大记录，串起主键有序链表的两端。",
      ur: "User Records：真实用户记录。从 Free Space 申请空间；按主键 next_record 成链。",
      fs: "Free Space：尚未使用空间。插满后申请新页。",
      pd: "Page Directory：槽保存每组最后一条记录的偏移，支持二分定位。",
      ft: "File Trailer（8B）：尾部校验和 + LSN，与头部对照，检测半页写入。"
    };
    layers.forEach(function (el) {
      el.addEventListener("click", function () {
        layers.forEach(function (x) { x.classList.remove("on"); });
        el.classList.add("on");
        detail.textContent = map[el.dataset.layer] || "";
      });
    });
    if (layers[0]) layers[0].click();
  })();

  /* ---- B+ tree descent ---- */
  (function () {
    const status = document.querySelector("#demo-btree .status");
    const nodes = document.querySelectorAll("#demo-btree [data-node]");
    const steps = [
      { id: "root", text: "从根页出发。目录项：主键 < 320 走页 30，≥ 320 走页 32。目标主键 20 → 页 30。" },
      { id: "inner", text: "在内节点页 30：1→页10，5→页28，12→页9，209→页18。因 12 ≤ 20 < 209，进入页 9。" },
      { id: "leaf", text: "在叶子页 9 用页目录二分 + 链表扫描，定位主键 20 的完整用户记录。聚簇索引查找结束。" }
    ];
    let i = -1;
    function paint() {
      nodes.forEach(function (n) {
        n.classList.remove("on");
        n.setAttribute("stroke-width", n.getAttribute("data-sw") || "1");
        if (!n.getAttribute("data-fill")) n.setAttribute("data-fill", n.getAttribute("fill"));
        n.setAttribute("fill", n.getAttribute("data-fill"));
      });
      if (i >= 0) {
        const el = document.querySelector('#demo-btree [data-node="' + steps[i].id + '"]');
        if (el) {
          el.classList.add("on");
          el.setAttribute("stroke", "#8b3d2f");
          el.setAttribute("stroke-width", "4");
        }
        status.textContent = steps[i].text;
      } else {
        status.textContent = "演示：在聚簇索引中查找主键 = 20。点击下一步逐层下降。";
      }
    }
    document.querySelector("#demo-btree .next")?.addEventListener("click", function () {
      i = Math.min(steps.length - 1, i + 1);
      paint();
    });
    document.querySelector("#demo-btree .prev")?.addEventListener("click", function () {
      i = Math.max(-1, i - 1);
      paint();
    });
    document.querySelector("#demo-btree .reset")?.addEventListener("click", function () {
      i = -1;
      paint();
    });
    paint();
  })();

  /* ---- Index leftmost tabs ---- */
  (function () {
    const tabs = document.querySelectorAll("#demo-prefix .tabs button");
    const panes = document.querySelectorAll("#demo-prefix .pane");
    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        tabs.forEach(function (b) { b.classList.remove("on"); });
        panes.forEach(function (p) { p.hidden = true; });
        btn.classList.add("on");
        const pane = document.querySelector('#demo-prefix .pane[data-pane="' + btn.dataset.tab + '"]');
        if (pane) pane.hidden = false;
      });
    });
  })();

  /* ---- Cost compare ---- */
  (function () {
    const status = document.querySelector("#demo-cost .status");
    const bars = document.querySelectorAll("#demo-cost .cost-bar");
    document.querySelector("#demo-cost .reveal")?.addEventListener("click", function () {
      bars.forEach(function (b) { b.style.opacity = "1"; });
      status.textContent = "结论：idx_key2 成本约 134，低于 idx_key1（168）与全表扫描（约 2038），优化器选 idx_key2。数值来自 single_table 的估算。";
    });
    document.querySelector("#demo-cost .reset")?.addEventListener("click", function () {
      bars.forEach(function (b) { b.style.opacity = ".25"; });
      status.textContent = "先估全表与各索引成本，再点「比较」看谁最便宜。";
    });
    bars.forEach(function (b) { b.style.opacity = ".25"; });
  })();

  /* ---- MVCC ReadView ---- */
  (function () {
    const cards = document.querySelectorAll("#demo-mvcc .vcard");
    const status = document.querySelector("#demo-mvcc .status");
    const view = document.querySelector("#demo-mvcc .viewbox");

    function resetCards() {
      cards.forEach(function (c) { c.classList.remove("hit", "miss", "cur"); });
    }

    function walk(mode) {
      resetCards();
      const order = ["v200", "v200b", "v100b", "v100a", "v80"];
      let visible = null;
      let log = [];

      if (mode === "rc1" || mode === "rr1") {
        view.textContent = "ReadView：m_ids=[100,200]，min=100，max=201，creator=0";
        log.push("生成 ReadView（100、200 仍活跃）。");
      } else if (mode === "rc2") {
        view.textContent = "ReadView：m_ids=[200]，min=200，max=201，creator=0";
        log.push("RC 再次查询：新 ReadView，100 已提交，不在 m_ids。");
      } else if (mode === "rr2") {
        view.textContent = "复用 ReadView：m_ids=[100,200]，min=100，max=201，creator=0";
        log.push("RR 再次查询：复用第一次 ReadView。");
      }

      const mids = mode === "rc2" ? [200] : [100, 200];
      const min = mode === "rc2" ? 200 : 100;
      const max = 201;

      for (let k = 0; k < order.length; k++) {
        const id = order[k];
        const el = document.querySelector('#demo-mvcc .vcard[data-v="' + id + '"]');
        const trx = Number(el.dataset.trx);
        el.classList.add("cur");
        let ok = false;
        if (trx < min) ok = true;
        else if (trx >= max) ok = false;
        else ok = mids.indexOf(trx) < 0;
        log.push("版本 trx_id=" + trx + " → " + (ok ? "可见" : "不可见，沿 roll_pointer 后退"));
        if (ok) {
          visible = el;
          break;
        }
        el.classList.remove("cur");
        el.classList.add("miss");
      }
      if (visible) {
        visible.classList.remove("cur");
        visible.classList.add("hit");
        log.push("返回用户：" + visible.querySelector("strong").textContent);
      }
      status.textContent = log.join("；");
    }

    document.querySelector("#demo-mvcc .rc1")?.addEventListener("click", function () { walk("rc1"); });
    document.querySelector("#demo-mvcc .rc2")?.addEventListener("click", function () { walk("rc2"); });
    document.querySelector("#demo-mvcc .rr1")?.addEventListener("click", function () { walk("rr1"); });
    document.querySelector("#demo-mvcc .rr2")?.addEventListener("click", function () { walk("rr2"); });
    document.querySelector("#demo-mvcc .reset")?.addEventListener("click", function () {
      resetCards();
      view.textContent = "尚未生成 ReadView";
      status.textContent = "选择 RC/RR 的一次或二次读取，观察版本链上哪一版可见。";
    });
  })();

  /* ---- Lock type tabs ---- */
  (function () {
    const tabs = document.querySelectorAll("#demo-lock .tabs button");
    const panes = document.querySelectorAll("#demo-lock .pane");
    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        tabs.forEach(function (b) { b.classList.remove("on"); });
        panes.forEach(function (p) { p.hidden = true; });
        btn.classList.add("on");
        const pane = document.querySelector('#demo-lock .pane[data-pane="' + btn.dataset.tab + '"]');
        if (pane) pane.hidden = false;
      });
    });
  })();
})();
