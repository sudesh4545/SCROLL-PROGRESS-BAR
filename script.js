(function () {
        "use strict";
        var sections = [].slice.call(
            document.querySelectorAll(".article section"),
          ),
          $ = function (x) {
            return document.getElementById(x);
          },
          size = 16;
        sections.forEach(function (s) {
          var a = document.createElement("a");
          a.href = "#" + s.id;
          a.textContent = s.querySelector("h2").textContent;
          $("toc").appendChild(a);
        });
        function progress() {
          var max = document.documentElement.scrollHeight - innerHeight,
            p = max ? scrollY / max : 0;
          $("bar").style.width = p * 100 + "%";
          var active = sections[0];
          sections.forEach(function (s) {
            if (s.getBoundingClientRect().top < innerHeight * 0.45) active = s;
          });
          document.querySelectorAll(".toc a").forEach(function (a) {
            a.classList.toggle("active", a.hash === "#" + active.id);
          });
          localStorage.setItem("readline:pos", String(scrollY));
        }
        addEventListener(
          "scroll",
          function () {
            requestAnimationFrame(progress);
          },
          { passive: true },
        );
        $("larger").onclick = function () {
          size = Math.min(22, size + 1);
          document.querySelector(".article").style.fontSize = size + "px";
        };
        $("smaller").onclick = function () {
          size = Math.max(14, size - 1);
          document.querySelector(".article").style.fontSize = size + "px";
        };
        $("focus").onclick = function () {
          document.querySelector(".toc").hidden =
            !document.querySelector(".toc").hidden;
        };
        $("bookmark").onclick = function () {
          localStorage.setItem("readline:bookmark", String(scrollY));
          $("bookmark").textContent = "Saved ✓";
        };
        var saved = Number(localStorage.getItem("readline:bookmark") || 0);
        if (saved)
          setTimeout(function () {
            scrollTo(0, saved);
          }, 100);
        progress();
      })();
