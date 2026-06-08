let Showingfavorites = false;
  
function Getfavorites() {
  return JSON.parse(
    localStorage.getItem(
      "Favorites"
    )
  ) || [];
}
// 讀取收藏清單

function Savefavorites(
  Favorites
) {
  localStorage.setItem(
    "Favorites",
    JSON.stringify(
      Favorites
    )
  );
}
// 儲存收藏清單

function Isfavorite(
  Placename
) {
  return Getfavorites()
    .includes(
      Placename
    );
}
// 判斷這間店是否已收藏

function Togglefavorite( Placename ) {
  let Favorites = Getfavorites();
  if ( Favorites.includes( Placename ) ) {
    Favorites = Favorites.filter(
        Name =>
          Name !== Placename
      );

  } else {
    Favorites.push(
      Placename
    );
  }
  Savefavorites( Favorites );
  Updatefavoritebutton( Placename );

}
// 點收藏按鈕切換，已收藏就取消，未收藏則加入

function Updatefavoritebutton(
  Placename
) {
  const Favoritebtn =
    document.getElementById(
      "Favoritebtn"
    );

  if (!Favoritebtn)
    return;

  Favoritebtn.textContent =
    Isfavorite(
      Placename
    )
      ? "⭐ 已收藏"
      : "☆ 收藏";
}
//更新 sidebar 收藏按鈕文字

//收藏、篩選切換

function Toggleshowfavorites() {
//切換模式

  Showingfavorites = !Showingfavorites;
  //讀收藏

  const Favorites = Getfavorites();
  //全部 marker

  const Markers = window.Placemarkers || [];
  const Map = window.Map;
  //一顆一顆判斷

  Markers.forEach(
    Marker => {

      const Place = Marker.placeData;
      if (!Place)
        return;

      if (
        !Showingfavorites ||
        Favorites.includes( Place.name )

      ) {
        Marker.addTo(Map);
      } else {
        Map.removeLayer(Marker);
      }
      //收藏才顯示
    }
  );

  const Showfavoritesbtn = document.getElementById( "Showfavoritesbtn" );

  if (
    Showfavoritesbtn
  ) {
const Desktoptext =
  Showfavoritesbtn.querySelector(".Desktoptext");

const Phonetext =
  Showfavoritesbtn.querySelector(".Phonetext");

if (Desktoptext) {
  Desktoptext.textContent =
    Showingfavorites
      ? "📍 顯示全部地標"
      : "⭐ 只看收藏";
}

if (Phonetext) {
  Phonetext.textContent =
    Showingfavorites
      ? "全部"
      : "⭐ 收藏";
}
  }
}
// 更新工具列按鈕文字

window.Getfavorites = Getfavorites;
window.Savefavorites = Savefavorites;
window.Isfavorite = Isfavorite;
window.Togglefavorite = Togglefavorite;
window.Updatefavoritebutton = Updatefavoritebutton;
window.Toggleshowfavorites = Toggleshowfavorites;
//掛到 window，給其他 JS 呼叫