/* =========================
   地圖預設位置
========================= */

window.Defaultcenter = [
  22.782629,
  120.403790
];

window.Defaultzoom = 15;


/* =========================
   建立地圖
========================= */

window.Map = L.map("Map", {
  zoomControl: true
}).setView(
  window.Defaultcenter,
  window.Defaultzoom
);


/* =========================
   白色簡約底圖
========================= */

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    subdomains: "abcd",

    maxZoom: 20,

    attribution:
      "&copy; OpenStreetMap contributors &copy; CARTO"
  }
).addTo(window.Map);


/* =========================
   修正尺寸
========================= */

setTimeout(() => {
  window.Map.invalidateSize();
}, 300);