(function () {
    var headlinesTopLeft = $("#headlines-top-left");
    var headlinesBottomRight = $("#headlines-bottom-right");
    var linksTop = headlinesTopLeft.find("a");
    var linksBottom = headlinesBottomRight.find("a");

    var left = headlinesTopLeft.offset().left;
    var right = headlinesBottomRight.offset().left - window.innerWidth;

    var animationIdLeft;
    var animationIdRight;

    moveElementToTheLeft();
    moveElementToTheRight();

    headlinesTopLeft.on("mouseover", function () {
        cancelAnimationFrame(animationIdLeft);
    });

    headlinesBottomRight.on("mouseover", function () {
        cancelAnimationFrame(animationIdRight);
    });

    headlinesTopLeft.on("mouseout", function () {
        moveElementToTheLeft();
    });

    headlinesBottomRight.on("mouseout", function () {
        moveElementToTheRight();
    });

    function moveElementToTheLeft() {
        if (left <= -linksTop.eq(0).outerWidth()) {
            left += linksTop.eq(0).outerWidth();
            linksTop.eq(0).appendTo(linksTop);
        }
        left--;
        headlinesTopLeft.css({ left: left + "px" });
        animationIdLeft = requestAnimationFrame(moveElementToTheLeft);
    }

    function moveElementToTheRight() {
        if (right >= -linksBottom.eq(0).outerWidth()) {
            right -= linksBottom.eq(0).outerWidth();
            linksBottom.eq(0).appendTo(linksBottom);
        }

        right++;
        headlinesBottomRight.css({ left: right + "px" });
        animationIdRight = requestAnimationFrame(moveElementToTheRight);
    }
})();
