var bottomDiv = $("#bottom-div");
var bar = $("#separator");
var lastX;

bar.on("mousedown", function (e) {
    if (e.button == 0) {
        lastX = e.clientX;
        $(document).on("mousemove", moved);
        e.preventDefault();
    }
});

bar.on("mouseup", function () {
    $(document).off("mousemove", moved);
});

function moved(e) {
    var dist = e.clientX - lastX;
    var newWidth = bar.offset().left + dist;

    bar.css({ left: newWidth + "px" });
    bottomDiv.css({ width: newWidth + "px" });
    lastX = e.clientX;
}
