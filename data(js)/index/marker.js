/* =========================
   分店資料展開
   把 branches 裡的每一間分店
   拆成獨立地標
========================= */

function Expandplaces(Places) {
  const Expandedplaces = [];

  Places.forEach(Place => {
    if (Array.isArray(Place.branches)) {
      Place.branches.forEach((Branch, Index) => {
        Expandedplaces.push({
          ...Place,
          ...Branch,

          name:
            Place.branches.length > 1
              ? `${Place.name} ${Index + 1}`
              : Place.name,

          mainName: Place.name,

          branchIndex:
            Index + 1
        });
      });
    } else {
      Expandedplaces.push(Place);
    }
  });

  return Expandedplaces;
}


/* =========================
   星星評分
   資料庫寫 rating: 1~5
========================= */

function Getratingstars(Rating) {

  const Starrating =
    Math.max(
      0,
      Math.min(
        5,
        Number(Rating) || 0
      )
    );

  // 沒有評分
  if (Starrating === 0) {
    return "⭐ 等你去銳評";
  }

  let Stars = "";

  for (let i = 1; i <= 5; i++) {
    Stars +=
      i <= Math.round(Starrating)
        ? "⭐"
        : "☆";
  }

  return `${Stars} ${Starrating.toFixed(1)}`;
}

window.Getratingstars =
  Getratingstars;

/* =========================
   建立全域 marker 陣列
========================= */

window.Placemarkers = [];

window.placeMarkers =
  window.Placemarkers;


/* =========================
   合併餐廳與飲料資料
========================= */

const Allplaces =
  Expandplaces([
    ...(window.Restaurants || []).map(Place => ({
      ...Place,
      Placetype: "restaurant"
    })),

    ...(window.Drinks || []).map(Place => ({
      ...Place,
      Placetype: "drink"
    }))
  ]);


/* =========================
   初始地標
========================= */

L.marker(
  [
    22.782629,
    120.403790
  ],
  {
    icon: window.Playericon
  }
)
  .addTo(window.Map)
  .bindPopup("養老院");


/* =========================
   建立所有店家 marker
========================= */

Allplaces.forEach(Place => {
  if (!Place.lat || !Place.lng) {
    return;
  }

  const Defaulticon =
    Place.Placetype === "drink"
      ? window.Drinkicon
      : window.Restauranticon;

  const Activeicon =
    Place.Placetype === "drink"
      ? window.Drinkiconactive
      : window.Restauranticonactive;

  const Marker =
    L.marker(
      [
        Place.lat,
        Place.lng
      ],
      {
        icon: Defaulticon
      }
    )
      .addTo(window.Map)
      .bindTooltip(
        Place.name,
        {
          direction: "top",
          offset: [0, -20],
          opacity: 0.95
        }
      );

  Marker.placeData =
    Place;

  window.Placemarkers.push(
    Marker
  );


  /* =========================
     點擊 marker
     1. 其他 marker 恢復原圖
     2. 目前 marker 變 active
     3. 打開側邊欄
  ========================= */

  Marker.on("click", () => {
    window.Placemarkers.forEach(Othermarker => {
      const Otherplace =
        Othermarker.placeData;

      if (!Otherplace) {
        return;
      }

      const Reseticon =
        Otherplace.Placetype === "drink"
          ? window.Drinkicon
          : window.Restauranticon;

      Othermarker.setIcon(
        Reseticon
      );
    });

    Marker.setIcon(
      Activeicon
    );

    Opensidebar(
      Place
    );
  });
});


/* =========================
   建立篩選器
========================= */

Setupareafilter();


/* =========================
   抽籤回地圖定位
========================= */

const Markerparams =
  new URLSearchParams(
    window.location.search
  );

const Markerskipcover =
  Markerparams.get("map");

if (Markerskipcover === "true") {
  Gotoselectedplacefromlottery();
} else {
  localStorage.removeItem(
    "Selectedplacename"
  );
}


/* =========================
   掛到 window
   讓 sidebar.js 可以使用
========================= */

window.Getratingstars =
  Getratingstars;