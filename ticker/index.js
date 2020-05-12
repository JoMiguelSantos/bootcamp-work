(function () {
    var headlinesTopLeft = document.getElementById("headlines-top-left");
    var headlinesBottomRight = document.getElementById(
        "headlines-bottom-right"
    );
    var linksTop = headlinesTopLeft.getElementsByTagName("a");
    var linksBottom = headlinesBottomRight.getElementsByTagName("a");

    var left = headlinesTopLeft.offsetLeft;
    var right = headlinesBottomRight.offsetLeft - window.innerWidth;

    var animationIdLeft;
    var animationIdRight;

    moveElementToTheLeft();
    moveElementToTheRight();

    headlinesTopLeft.addEventListener("mouseover", function () {
        cancelAnimationFrame(animationIdLeft);
    });

    headlinesBottomRight.addEventListener("mouseover", function () {
        cancelAnimationFrame(animationIdRight);
    });

    headlinesTopLeft.addEventListener("mouseout", function () {
        moveElementToTheLeft();
    });

    headlinesBottomRight.addEventListener("mouseout", function () {
        moveElementToTheRight();
    });

    function moveElementToTheLeft() {
        if (left <= -linksTop[0].offsetWidth) {
            left += linksTop[0].offsetWidth;
            linksTop[0].parentNode.appendChild(linksTop[0]);
        }
        left--;
        headlinesTopLeft.style.left = left + "px";
        animationIdLeft = requestAnimationFrame(moveElementToTheLeft);
    }

    function moveElementToTheRight() {
        if (right >= -linksBottom[0].offsetWidth) {
            right -= linksBottom[0].offsetWidth;
            linksBottom[0].parentNode.appendChild(linksBottom[0]);
        }
        right++;
        headlinesBottomRight.style.left = right + "px";
        animationIdRight = requestAnimationFrame(moveElementToTheRight);
    }
})();
