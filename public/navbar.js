const header = document.getElementById("header");
const toggle = document.getElementById("toggle");
const navbar = document.getElementById("navbar");

document.onclick = function (e) {
  if (
    e.target !== "header" &&
    e.target.id !== "toggle" &&
    e.target.id !== "navbar"
  ) {
    toggle.classList.remove("actives");
    navbar.classList.remove("actives");
  }
};
toggle.onclick = function () {
  toggle.classList.toggle("actives");
  navbar.classList.toggle("actives");
};
