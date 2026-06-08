const Drawbtn = document.getElementById("Drawbtn");

const Resulttext = document.getElementById("Resulttext");

const Lotteryimg = document.getElementById("Lotteryimg");

const Backmapbtn = document.getElementById("Backmapbtn");

const Restauranttypebtn = document.getElementById("Restauranttypebtn");

const Drinktypebtn = document.getElementById("Drinktypebtn");

const Images = [
  "image/抽籤1.png",
  "image/抽籤2.png"
];

let Isdrawing = false;
let Lotterytype = "restaurant";

function Updatelotterytypebuttons() {
  Restauranttypebtn.classList.toggle(
    "Active",
    Lotterytype === "restaurant"
  );

  Drinktypebtn.classList.toggle(
    "Active",
    Lotterytype === "drink"
  );

  Resulttext.textContent = "";

  Drawbtn.textContent =
    Lotterytype === "restaurant"
      ? "今天晚餐吃什麼"
      : "今天喝什麼";
}

function Getplaceareas(Place) {
  if (Array.isArray(Place.area)) {
    return Place.area;
  }
  return [Place.area];
}

function Getplacekind(Place) {
  return Place.kind || Place.type || "";
}

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
    } 
    else {
      Expandedplaces.push(Place);
    }
  });
  return Expandedplaces;
}

function Getlotteryplaces() {
  const Selectedareas =
    JSON.parse(
      localStorage.getItem("Selectedareas") || '["all"]'
    );

  const Selectedkind =
    localStorage.getItem("Selectedkind") || "all";

  const Sourceplaces =
    Lotterytype === "restaurant"
      ? window.Restaurants || []
      : window.Drinks || [];

  const Places =
    Expandplaces(Sourceplaces);

  return Places.filter(Place => {
    const Areas =
      Getplaceareas(Place);

    const Kind =
      Getplacekind(Place);

    const Matcharea =
      Selectedareas.includes("all") ||
      Selectedareas.some(area =>
        Areas.includes(area)
      );

    const Matchkind =
      Selectedkind === "all" ||
      Kind === Selectedkind;

    return Matcharea && Matchkind;
  });
}

Restauranttypebtn.addEventListener(
  "click",
  () => {
    if (Isdrawing) return;

    Lotterytype = "restaurant";

    Updatelotterytypebuttons();
  }
);

Drinktypebtn.addEventListener(
  "click",
  () => {
    if (Isdrawing) return;

    Lotterytype = "drink";

    Updatelotterytypebuttons();
  }
);

Drawbtn.addEventListener(
  "click",
  () => {
    if (Isdrawing) return;

    const Places =
      Getlotteryplaces();

    if (Places.length === 0) {
      Resulttext.textContent =
        Lotterytype === "restaurant"
          ? "目前這個地區或類型沒有餐廳"
          : "目前這個地區或類型沒有飲料店";

      return;
    }

    Isdrawing = true;

    Drawbtn.disabled = true;

    Drawbtn.textContent = "抽籤中...";

    const Nameinterval =
      setInterval(() => {
        const Randomindex =
          Math.floor(
            Math.random() * Places.length
          );

        Resulttext.textContent =
          Places[Randomindex].name;
      }, 100);

    let Currentimageindex = 0;

    const Imageinterval =
      setInterval(() => {
        Lotteryimg.src =
          Images[Currentimageindex];

        Currentimageindex =
          (Currentimageindex + 1) %
          Images.length;
      }, 100);

    setTimeout(() => {
      clearInterval(Nameinterval);

      clearInterval(Imageinterval);

      const Finalindex =
        Math.floor(
          Math.random() * Places.length
        );

      const Finalplace =
        Places[Finalindex];

      Lotteryimg.src =
        Images[
          Finalindex % Images.length
        ];

      Resulttext.innerHTML = `
        🎉 抽中：
        <button
          id="Goplacebtn"
          class="Resultplacebtn"
          type="button"
        >
          ${Finalplace.name}
        </button>
      `;

      const Goplacebtn =
        document.getElementById("Goplacebtn");

      Goplacebtn.addEventListener(
        "click",
        () => {
          localStorage.setItem(
            "Selectedplacename",
            Finalplace.name
          );

          window.location.href =
            "index.html?map=true";
        }
      );

      Isdrawing = false;

      Drawbtn.disabled = false;

      Drawbtn.textContent =
        Lotterytype === "restaurant"
          ? "再抽一次餐廳"
          : "再抽一次飲料";
    }, 4000);
  }
);

Backmapbtn.addEventListener(
  "click",
  () => {
    window.location.href =
      "index.html?map=true";
  }
);

Updatelotterytypebuttons();

window.Getlotteryplaces =
  Getlotteryplaces;