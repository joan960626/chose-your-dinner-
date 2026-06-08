/* =========================
   打開側邊欄
========================= */

function Opensidebar(Place) {
  const Sidebar =
    document.getElementById(
      "Sidebar"
    );

  if (!Sidebar) return;

  Sidebar.classList.remove(
    "Hidden"
  );


  /* =========================
     側邊欄內容
  ========================= */

  Sidebar.innerHTML = `
    <button
      id="Closebtn"
      type="button"
    >
      ✕
    </button>

    <h2>
      ${Place.name || "未命名店家"}
    </h2>

    <p>
      ⭐ 評分：
      ${
        window.Getratingstars
          ? window.Getratingstars(
              Place.rating
            )
          : "☆☆☆☆☆"
      }
    </p>

    <p>
      💰 ${
        Place.money || "未提供"
      }
    </p>

    <p>
      📍 ${
        Place.where || "未提供"
      }
    </p>

    <p>
      📝 ${
        Place.what || "未提供"
      }
    </p>

    <button
      id="Favoritebtn"
      class="Favoritebtn"
      type="button"
    >
      ${
        Isfavorite(
          Place.name
        )
          ? "⭐ 已收藏"
          : "☆ 收藏"
      }
    </button>

    ${
      Place.link
        ? `
          <a
            href="${Place.link}"
            target="_blank"
            class="Linkbtn"
          >
            Google Map
          </a>
        `
        : ""
    }
  `;


  /* =========================
     關閉側邊欄
  ========================= */

  const Closebtn =
    document.getElementById(
      "Closebtn"
    );

  if (Closebtn) {
    Closebtn.addEventListener(
      "click",
      () => {
        Sidebar.classList.add(
          "Hidden"
        );

        Resetmarkericons();
      }
    );
  }


  /* =========================
     收藏按鈕
  ========================= */

  const Favoritebtn =
    document.getElementById(
      "Favoritebtn"
    );

  if (Favoritebtn) {
    Favoritebtn.addEventListener(
      "click",
      () => {
        Togglefavorite(
          Place.name
        );
      }
    );
  }
}


/* =========================
   重設所有 marker icon
========================= */

function Resetmarkericons() {
  const Markers =
    window.Placemarkers || [];

  Markers.forEach(Marker => {
    const Markerplace =
      Marker.placeData;

    if (!Markerplace) return;

    const Reseticon =
      Markerplace.Placetype ===
      "drink"
        ? window.Drinkicon
        : window.Restauranticon;

    Marker.setIcon(
      Reseticon
    );
  });
}


/* =========================
   掛到 window
========================= */

window.Opensidebar =
  Opensidebar;