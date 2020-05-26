var headlinesTopLeft = $("#headlines-top-left");
var headlinesBottomRight = $("#headlines-bottom-right");
var linksTop = headlinesTopLeft.find("a");
var linksBottom = headlinesBottomRight.find("a");
var left;
var right;
var animationIdLeft;
var animationIdRight;

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
    console.log("moving left");

    if (left <= -linksTop.eq(0).outerWidth()) {
        left += linksTop.eq(0).outerWidth();
        linksTop.eq(0).appendTo(linksTop);
    }
    left--;
    headlinesTopLeft.css({ left: left + "px" });
    animationIdLeft = requestAnimationFrame(moveElementToTheLeft);
}

function moveElementToTheRight() {
    console.log("moving right");
    if (right >= -linksBottom.eq(0).outerWidth()) {
        right -= linksBottom.eq(0).outerWidth();
        linksBottom.eq(0).appendTo(linksBottom);
    }

    right++;
    headlinesBottomRight.css({ left: right + "px" });
    animationIdRight = requestAnimationFrame(moveElementToTheRight);
}

$(document).ready(
    $.get("/data.json", function (data) {
        console.log("data", data);
        for (var i = 0; i < 8; i++) {
            if (i < 4) {
                linksTop.eq(i).attr("href", data[i].url);
                linksTop.eq(i).text(data[i].text);
            } else {
                linksBottom.eq(i - 4).attr("href", data[i].url);
                linksBottom.eq(i - 4).text(data[i].text);
            }
        }
        left = headlinesTopLeft.offset().left;
        right = headlinesBottomRight.offset().left - window.innerWidth;

        moveElementToTheLeft();
        moveElementToTheRight();
    })
);
