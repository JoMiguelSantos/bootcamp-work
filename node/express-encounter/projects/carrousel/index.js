(function () {
    var kitties = document.querySelectorAll(".kitty-container img");
    var dots = document.querySelectorAll(".dots span");
    var dotsArr = document.querySelector(".dots");
    var timer;
    var i = 0;
    var catNum;
    var isTransitioning;

    function moveKitties() {
        isTransitioning = true;
        kitties[i].classList.remove("onscreen");
        dots[i].classList.remove("active");
        kitties[i].classList.add("offscreen-left");

        if (catNum != undefined) {
            kitties[catNum].classList.add("onscreen");
            dots[catNum].classList.add("active");
            i = catNum;
            catNum = undefined;
            return;
        }

        if (i === 3) {
            kitties[0].classList.add("onscreen");
            dots[0].classList.add("active");
            i = 0;
        } else {
            kitties[i + 1].classList.add("onscreen");
            dots[i + 1].classList.add("active");
            i++;
        }
    }

    timer = setTimeout(moveKitties, 5000);

    function moveToCat(dotNum) {
        if (dotNum === i) {
            return;
        } else if (isTransitioning) {
            return;
        }
        clearTimeout(timer);
        catNum = dotNum;
        moveKitties();
    }

    document.addEventListener("transitionend", function (e) {
        if (e.target.classList.contains("offscreen-left")) {
            e.target.classList.remove("offscreen-left");
        }
        isTransitioning = false;
        clearTimeout(timer);
        timer = setTimeout(moveKitties, 5000);
    });

    dotsArr.addEventListener("click", function (e) {
        var dotNum = Array.prototype.indexOf.call(dots, e.target);
        moveToCat(dotNum);
    });
})();
