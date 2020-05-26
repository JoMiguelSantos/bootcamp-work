// Make a static HTML page that has a large <textarea> on it.
// When the user types in it, save the value in localStorage.
// When the user comes back to the page after navigating away or
// closing the browser, the stored value should automatically appear in the <textarea>.

var textarea = $("textarea");

textarea.on("input", function () {
    try {
        localStorage.setItem("input", this.value);
    } catch (err) {
        console.log("Oh nooooo");
    }
});

$(document).ready(function () {
    try {
        textarea.val(localStorage.getItem("input"));
    } catch (err) {
        console.log("Oh nooooo");
    }
});
