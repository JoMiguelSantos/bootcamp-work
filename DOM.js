// Write a function that expects a string representing a selector to be passed as a
// parameter. The function should find all the elements in the document that match
// the selector and change their style so that the text they contain is italic,
// underlined, and bold.

function findAllAndStyle(sel) {
    var elements = document.querySelectorAll(sel);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.fontStyle = "italic";
        elements[i].style.fontWeight = "bold";
        elements[i].style.textDecoration = "underline";
    }
}

// Write a function that expects a string representing a class name to be passed as
// a parameter. The function should return an array containing all the elements in
// the document that have the class that was passed in.
function findByClass(className) {
    return [].slice.call(document.getElementsByClassName(className));
}

// Write a function that inserts an element into the body of the currently loaded page.
// That element should have fixed position, z-index of 2147483647, left of 20px,
// top of 100px, font-size of 200px, and contain the text 'AWESOME'.
function insertElementInBody(el) {
    var element = document.createElement(el);
    element.style.zIndex = 2147483647;
    element.style.left = "20px";
    element.style.top = "100px";
    element.style.fontSize = "200px";
    element.textContent = "AWESOME";
    document.body.appendChild(element);
}
