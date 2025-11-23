import { initTileMain } from "./js/tile_main.js";

document.addEventListener("DOMContentLoaded", function () {
  const splide = new Splide("#project-carousel", {
    type: "loop",
    perPage: 1,
    perMove: 1,
    gap: "1.5rem",
    padding: "2rem",
    arrows: true,
    pagination: true,
    trimSpace: false,
    padding: { left: "10%", right: "10%" },
    focus: "center",
    breakpoints: {
      768: {
        padding: { left: "5%", right: "5%" },
      },
    },
  });

  splide.mount();
  initTileMain().then((r) => "");
});
