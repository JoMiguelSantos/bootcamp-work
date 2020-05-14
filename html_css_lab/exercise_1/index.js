var overlay = document.getElementById("overlay");
var sideNav = document.getElementById("side-nav");
var cross = document.getElementsByClassName("cross")[0];
var hamburger = document.getElementsByClassName("hamburger")[0];

cross.addEventListener("click", function () {
    overlay.classList.remove("active");
    sideNav.classList.remove("active");
});

hamburger.addEventListener("click", function () {
    overlay.classList.add("active");
    sideNav.classList.add("active");
});
