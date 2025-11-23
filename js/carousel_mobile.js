document.addEventListener("DOMContentLoaded", function () {
  const splide = new Splide("#mobile-carousel", {
    type: "loop",
    perPage: 3,
    perMove: 1,
    gap: "1.5rem",
    padding: "2rem",
    arrows: true,
    pagination: true,
    trimSpace: false,
    focus: "center",
    breakpoints: {
      768: {
        padding: { left: "5%", right: "5%" },
      },
    },
  });

  splide.mount();
});
