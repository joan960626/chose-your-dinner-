/* =========================
   取得畫面元件
========================= */

const AreaTogglebtn =
  document.getElementById("AreaTogglebtn");

const KindTogglebtn =
  document.getElementById("KindTogglebtn");

const Enterbtn =
  document.getElementById("Enterbtn");

const Entermapbtn =
  document.getElementById("Entermapbtn");

const Cover =
  document.getElementById("Cover");

const Intro =
  document.getElementById("Intro");

const Toolbar =
  document.getElementById("Toolbar");

const Golotterybtn =
  document.getElementById("Golotterybtn");

const Resetmapbtn =
  document.getElementById("Resetmapbtn");

const Showfavoritesbtn =
  document.getElementById("Showfavoritesbtn");

const Areafilter =
  document.getElementById("Areafilter");

const Kindfilter =
  document.getElementById("Kindfilter");


/* =========================
   網址參數
========================= */

const Params =
  new URLSearchParams(
    window.location.search
  );

const Skipcover =
  Params.get("map");


/* =========================
   工具列控制
========================= */

function Showtoolbar() {
  if (Toolbar) {
    Toolbar.style.display =
      "block";
  }
}

function Hidetoolbar() {
  if (Toolbar) {
    Toolbar.style.display =
      "none";
  }
}


/* =========================
   地圖刷新
========================= */

function Refreshmap() {
  setTimeout(() => {
    if (!window.Map) return;

    window.Map.invalidateSize();
  }, 300);
}


/* =========================
   關閉所有篩選器
========================= */

function Closefilters() {
  Areafilter?.classList.add(
    "Hidden"
  );

  Kindfilter?.classList.add(
    "Hidden"
  );
}


/* =========================
   初始畫面
========================= */

if (Skipcover === "true") {
  Cover.style.display =
    "none";

  Intro?.classList.add(
    "Hidden"
  );

  Showtoolbar();

  Refreshmap();

} else {

  Hidetoolbar();

  Cover.style.display =
    "flex";

  Cover.style.opacity =
    "1";

  Intro?.classList.add(
    "Hidden"
  );
}


/* =========================
   封面 → 功能介紹
========================= */

Enterbtn?.addEventListener(
  "click",
  () => {

    Intro.style.display =
      "flex";

    Intro.style.opacity =
      "1";

    Cover.style.opacity =
      "0";

    setTimeout(() => {
      Cover.style.display =
        "none";
    }, 500);
  }
);


/* =========================
   功能介紹 → 地圖
========================= */

Entermapbtn?.addEventListener(
  "click",
  () => {

    Intro.style.opacity =
      "0";

    setTimeout(() => {

      Intro.style.display =
        "none";

      Showtoolbar();

      Refreshmap();

    }, 500);
  }
);


/* =========================
   抽籤
========================= */

Golotterybtn?.addEventListener(
  "click",
  () => {
    window.location.href =
      "lottery.html";
  }
);


/* =========================
   回原點
========================= */

Resetmapbtn?.addEventListener(
  "click",
  () => {
    window.Map.setView(
      window.Defaultcenter,
      window.Defaultzoom
    );
  }
);


/* =========================
   收藏
========================= */

Showfavoritesbtn?.addEventListener(
  "click",
  () => {
    Toggleshowfavorites();
  }
);


/* =========================
   地區下拉
========================= */

AreaTogglebtn?.addEventListener(
  "click",
  event => {

    event.stopPropagation();

    Kindfilter?.classList.add(
      "Hidden"
    );

    Areafilter?.classList.toggle(
      "Hidden"
    );
  }
);


/* =========================
   類型下拉
========================= */

KindTogglebtn?.addEventListener(
  "click",
  event => {

    event.stopPropagation();

    Areafilter?.classList.add(
      "Hidden"
    );

    Kindfilter?.classList.toggle(
      "Hidden"
    );
  }
);


/* =========================
   手機 / 桌機文字切換
========================= */

function Updatebuttontext() {

  const Isphone =
    window.innerWidth <= 768;


  AreaTogglebtn &&
    (AreaTogglebtn.textContent =
      Isphone
        ? "地區"
        : "選擇地區 ▼");


  const Selectedkind =
    localStorage.getItem(
      "Selectedkind"
    ) || "all";

  KindTogglebtn &&
    (KindTogglebtn.textContent =
      Isphone
        ? "類型"
        : Selectedkind === "all"
          ? "全部類型 ▼"
          : `${Selectedkind} ▼`);


  Golotterybtn &&
    (Golotterybtn.textContent =
      Isphone
        ? "🎲 抽籤"
        : "🎲 今天晚餐吃什麼?");


  Showfavoritesbtn &&
    (Showfavoritesbtn.textContent =
      Isphone
        ? "⭐ 收藏"
        : "⭐ 只看收藏");


  Resetmapbtn &&
    (Resetmapbtn.textContent =
      Isphone
        ? "📍 原點"
        : "📍 回到原點");
}

Updatebuttontext();

window.addEventListener(
  "resize",
  Updatebuttontext
);


/* =========================
   點空白關閉篩選器
========================= */

document.addEventListener(
  "click",
  event => {

    const Clickedinsidearea =
      AreaTogglebtn?.contains(
        event.target
      ) ||
      Areafilter?.contains(
        event.target
      );

    const Clickedinsidekind =
      KindTogglebtn?.contains(
        event.target
      ) ||
      Kindfilter?.contains(
        event.target
      );

    if (!Clickedinsidearea) {
      Areafilter?.classList.add(
        "Hidden"
      );
    }

    if (!Clickedinsidekind) {
      Kindfilter?.classList.add(
        "Hidden"
      );
    }

  }
);