/* =========================
   抓出全部店家
   餐廳 + 飲料
========================= */

function Getallplaces() {
  return [
    ...(window.Restaurants || []),
    ...(window.Drinks || [])
  ];
}


/* =========================
   把 area 統一變成陣列
========================= */

function Getplaceareas(Place) {
  if (Array.isArray(Place.area)) {
    return Place.area;
  }

  return [Place.area];
}

/* =========================
   抓店家類型
   kind: 早餐/火鍋/飲料
========================= */

function Getplacekind(Place) { return Place.kind || ""; }

/* =========================
   讀取已儲存地區
========================= */

function Getsavedareas() {
  return JSON.parse(
    localStorage.getItem("Selectedareas") || '["all"]'
  );
}

/* =========================
   讀取已儲存類型
========================= */

function Getsavedkind() {
  return localStorage.getItem("Selectedkind") || "all";
}

/* =========================
   儲存地區
========================= */

function Savesselectedareas( Selectedareas ) {
  localStorage.setItem(
    "Selectedareas",
    JSON.stringify( Selectedareas )
  );
}

/* =========================
   儲存類型
========================= */

function Savesselectedkind( Selectedkind ) {
  localStorage.setItem(
    "Selectedkind",
    Selectedkind
  );
}

/* =========================
   建立：
   1. 地區複選
   2. kind 單選
========================= */

function Setupareafilter() {

  const Areafilter = document.getElementById( "Areafilter" );
  const Kindfilter = document.getElementById( "Kindfilter" );
  const KindTogglebtn = document.getElementById( "KindTogglebtn" );

  if (
    !Areafilter ||
    !Kindfilter ||
    !KindTogglebtn
  ) return;

  const Places = Getallplaces();

  /* 清空舊內容 */

  Areafilter.innerHTML = "";
  Kindfilter.innerHTML = "";


  /* =========================
     抓全部 area
     去除重複
  ========================= */

  const Areas = [
    ...new Set(
      Places
        .flatMap(Place =>
          Getplaceareas(Place)
        )
        .filter(Boolean)
    )
  ];

  /* =========================
     抓全部 kind
     去除重複
  ========================= */

  const Kinds = [
    ...new Set(
      Places
        .map(Place => Getplacekind(Place)
        )
        .filter(Boolean)
    )
  ];

  /* =========================
     讀取上次選擇
  ========================= */

  const Savedareas = Getsavedareas();
  const Savedkind = Getsavedkind();

  /* =========================
     建立全部地區
  ========================= */

  const Allarealabel = document.createElement( "label" );

  Allarealabel.innerHTML = `
    <input
      type="checkbox"
      value="all"
    >
    全部地區
  `;

  Areafilter.appendChild( Allarealabel );

  /* =========================
     建立各地區 checkbox
  ========================= */

  Areas.forEach(
    Area => {
      const Label =
        document.createElement("label");

      Label.innerHTML = `
        <input
          type="checkbox"
          value="${Area}"
        >
        ${Area}
      `;

      Areafilter.appendChild(Label);
    }
  );


  /* =========================
     建立全部類型
  ========================= */

  const Allkindlabel = document.createElement("label");
  Allkindlabel.innerHTML = `
    <input
      type="radio"
      name="Kindradio"
      value="all"
    >
    全部類型
  `;

  Kindfilter.appendChild( Allkindlabel );

  /* =========================
     建立各類型 radio
  ========================= */

  Kinds.forEach(
    Kind => {
      const Label =
        document.createElement("label");

      Label.innerHTML = `
        <input
          type="radio"
          name="Kindradio"
          value="${Kind}"
        >
        ${Kind}
      `;

      Kindfilter.appendChild(Label);
    }
  );


  /* =========================
     快速抓 checkbox/radio
  ========================= */

  const Allinput =
    Areafilter.querySelector(
      'input[value="all"]'
    );

  const Areainputs =
    Array.from(
      Areafilter.querySelectorAll('input[type="checkbox"]:not([value="all"])')
    );

  const Kindinputs =
    Array.from(
      Kindfilter.querySelectorAll('input[type="radio"]')
    );

  /* =========================
     讀目前勾選地區
  ========================= */

  function Getselectedareas() {
    return Array.from(
      Areafilter.querySelectorAll("input:checked")
    ).map(
      input => input.value

    );
  }

  /* =========================
     讀目前 kind
  ========================= */

  function Getselectedkind() {

    const Checkedkind =
      Kindfilter.querySelector(
        'input[type="radio"]:checked'
      );

    return Checkedkind
      ? Checkedkind.value : "all";
  }


  /* =========================
     套用已存地區
  ========================= */

  function Applycheckedareas(
    Selectedareas
  ) {

    if (
      Selectedareas.includes("all") ||
      Selectedareas.length === 0
    ) {
      Allinput.checked = true;

      Areainputs.forEach(
        input => {
          input.checked = true;
        }
      );

      return;
    }

    Areainputs.forEach(
      input => {
        input.checked =
          Selectedareas.includes( input.value );
      }
    );

    Allinput.checked =
      Areainputs.every(
        input => input.checked
      );
  }


  /* =========================
     套用已存 kind
  ========================= */

  function Applycheckedkind(
    Selectedkind
  ) {

    let Haschecked = false;

    Kindinputs.forEach(
      input => {
        input.checked =
          input.value === Selectedkind;

        if (
          input.checked
        ) {
          Haschecked = true;
        }
      }
    );

    if (!Haschecked) {

      const Allkindinput =
        Kindfilter.querySelector( 'input[value="all"]' );

      if (
        Allkindinput
      ) {
        Allkindinput.checked = true;
      }
    }
  }


  /* =========================
     更新 kind 按鈕文字
  ========================= */

function Updatekindbuttontext(Selectedkind) {
  const Desktoptext =
    KindTogglebtn.querySelector(".Desktoptext");

  const Phonetext =
    KindTogglebtn.querySelector(".Phonetext");

  if (Desktoptext) {
    Desktoptext.textContent =
      Selectedkind === "all"
        ? "全部類型 ▼"
        : `${Selectedkind} ▼`;
  }

  if (Phonetext) {
    Phonetext.textContent = "類型";
  }
}


  /* =========================
     存起來 + 篩選 marker
  ========================= */

  function Saveandfilter() {

    let Selectedareas = Getselectedareas();

    if (
      Selectedareas.length === 0
    ) {

      Allinput.checked = true;

      Areainputs.forEach(
        input => {
          input.checked = true;
        }
      );

      Selectedareas = [
        "all",
        ...Areainputs.map(
          input => input.value
        )
      ];
    }

    const Selectedkind = Getselectedkind();

    Savesselectedareas( Selectedareas );
    Savesselectedkind( Selectedkind );

    Updatekindbuttontext( Selectedkind );

    Filtermarkers(
      Selectedareas,
      Selectedkind
    );
  }

  /* 初次載入 */

  Applycheckedareas( Savedareas );
  Applycheckedkind( Savedkind );
  Saveandfilter();

  /* =========================
     地區變動
  ========================= */

  Areafilter.addEventListener( "change", event => {

      const Clickedinput = event.target;
      const Beforeselectedareas = Getsavedareas();
      const Wasallselected = Beforeselectedareas.includes("all");
      if ( Clickedinput.value === "all" ) {

        Areainputs.forEach(
          input => {
            input.checked = Allinput.checked;

          }
        );

      } else {

        if (
          Wasallselected
        ) {

          Areainputs.forEach(
            input => {
              input.checked = false;
            }
          );

          Clickedinput.checked = true;
          Allinput.checked = false;

        } else {
          Allinput.checked =
            Areainputs.every( input => input.checked );

        }
      }

      Saveandfilter();
    }
  );


  /* =========================
     kind 變動
  ========================= */

  Kindfilter.addEventListener(
    "change",
    () => {
      Saveandfilter();
    }
  );
}


/* =========================
   真正控制 marker 顯示
========================= */

function Filtermarkers(
  Selectedareas,
  Selectedkind
) {

  const Map = window.Map;
  const Markers =
    window.Placemarkers ||
    window.placeMarkers ||
    [];

  Markers.forEach(
    Marker => {

      const Place = Marker.placeData;

      if (!Place)
        return;

      const Areas = Getplaceareas(Place);
      const Kind = Getplacekind(Place);

      const Matcharea =
        Selectedareas.includes("all") ||
        Selectedareas.some( area => Areas.includes(area) );

      const Matchkind = Selectedkind === "all" || Kind === Selectedkind;
      if ( Matcharea && Matchkind ) {
        Marker.addTo(Map);

      } else {
        Map.removeLayer(Marker);
      }
    }
  );
}

window.Getallplaces = Getallplaces;
window.Getplaceareas = Getplaceareas;
window.Getplacekind = Getplacekind;
window.Setupareafilter = Setupareafilter;
window.Filtermarkers = Filtermarkers;
//導到window，這樣其他檔案就可以讀到