var bottomDiv = $("#bottom-div");
var bar = $("#separator");
var lastX;
console.log(bar, bottomDiv);

bar.on("mousedown", (e) => {
    console.log("mouse is down");
    if (e.button == 0) {
        lastX = e.clientX;
        console.log(lastX);

        $(document).on("mousemove", moved);
        e.preventDefault();
    }
});

function moved(e) {
    console.log("it moved");

    if (e.buttons == 0) {
        console.log("if");

        $(document).off("mousemove", moved);
    } else {
        console.log("else");

        var dist = e.clientX - lastX;
        console.log("dist", dist);

        // find
        var newWidth = bar.offset().left + dist;
        console.log("newWidth", newWidth);

        bar.css({ left: newWidth + "px" });
        bottomDiv.css({ width: newWidth + "px" });
        lastX = e.clientX;
    }
}
