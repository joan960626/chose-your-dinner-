function Gotoselectedplacefromlottery() {
  const Selectedplacename =
    localStorage.getItem(
      "Selectedplacename"
    );

  if (!Selectedplacename) return;

  const Markers =
    window.Placemarkers || [];

  const Map =
    window.Map;

  const Targetmarker =
    Markers.find(Marker => {

      return (
        Marker.placeData &&
        Marker.placeData.name ===
          Selectedplacename
      );

    });

  if (!Targetmarker) return;

  const Place =
    Targetmarker.placeData;

  setTimeout(() => {

    Map.invalidateSize();

    Map.setView(
      [Place.lat, Place.lng],
      17
    );

    window.Placemarkers.forEach(
      Othermarker => {

        const Otherplace =
          Othermarker.placeData;

        if (!Otherplace) return;

        const Reseticon =
          Otherplace.Placetype === "drink"
            ? window.Drinkicon
            : window.Restauranticon;

        Othermarker.setIcon(
          Reseticon
        );

      }
    );

    const Activeicon =
      Place.Placetype === "drink"
        ? window.Drinkiconactive
        : window.Restauranticonactive;

    Targetmarker.setIcon(
      Activeicon
    );

    Targetmarker.fire(
      "click"
    );

    Targetmarker.openTooltip();

    localStorage.removeItem(
      "Selectedplacename"
    );

  }, 300);
}

window.Gotoselectedplacefromlottery =
  Gotoselectedplacefromlottery;