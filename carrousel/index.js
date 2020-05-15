(function () {
    var kitties = document.querySelectorAll(".kitty-container img");
    var dots = document.querySelectorAll(".dots span");

    var i = 0;

    function moveKitties() {
        kitties[i].classList.remove("onscreen");
        dots[i].classList.remove("active");
        kitties[i].classList.add("offscreen-left");

        if (i === 3) {
            kitties[0].classList.add("onscreen");
            dots[0].classList.add("active");
            i = 0;
        } else {
            kitties[i + 1].classList.add("onscreen");
            dots[i + 1].classList.add("active");
            i++;
        }

        // setTimeout(moveKitties, 5000);
    }
    // either setInterval called once or setTimeout called recursively works
    // setTimeout(moveKitties, 5000);
    setInterval(moveKitties, 5000);

    // transitionend runs when a CSS transition finishes
    document.addEventListener("transitionend", function (e) {
        if ("offscreen-left" === e.target.className) {
            e.target.classList.remove("offscreen-left");
        }
    });
})();
