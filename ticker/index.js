(function () {
    var headlines = document.getElementById("headlines");
    var links = headlines.getElementsByTagName("a");

    var left = headlines.offsetLeft;

    moveElement();

    function moveElement() {
        if (left <= -links[0].offsetWidth) {
            left += links[0].offsetWidth;
            links[0].parentNode.appendChild(links[0]);
        }
        left -= 1;
        headlines.style.left = left + "px";
        requestAnimationFrame(moveElement);
    }
})();
