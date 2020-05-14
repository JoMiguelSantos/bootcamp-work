// Make a page that has on it an element that is 100px by 100px in size, has absolute
// positioning, and has a solid background color. Add an event handler that makes this
// box center itself directly under the user's mouse pointer as it is moved across the
// screen.
var divEx1 = document.getElementById("exercise-1");
divEx1.addEventListener("mousemove", function (e) {
    divEx1.style.left = -e.target.offsetWidth / 2 + e.clientX + "px";
    divEx1.style.top = -e.target.offsetWidth / 2 + e.clientY + "px";
});

// Make a page that has a <textarea> element on it. As the user types visible
// characters into this field, the characters should be replaced with the characters
// in the corresponding position in the Gettysburg Address. (Note - you can get and
// set the text in a <textarea> through its value property.)

var textAreaEx2 = document.getElementById("exercise-2");
var gettysburgAddress =
    "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. But, in a larger sense, we can not dedicate—we can not consecrate—we can not hallow—this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us—that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion—that we here highly resolve that these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom—and that government of the people, by the people, for the people, shall not perish from the earth.";

textAreaEx2.addEventListener("input", function (e) {
    e.target.value = gettysburgAddress.slice(0, e.target.value.length);
});

// Make a page that has on it an element that is 100px by 100px in size and has a solid
// black border. When the user mouses down on this box, its background should change
// to a randomly selected color. When the user mouses up on it, its background should
// change to another randomly selected color.

var divEx3 = document.getElementById("exercise-3");
var randomNumber = () => Math.floor(Math.random() * 255);
var randomColor = () => {
    return (
        "rgb(" +
        randomNumber() +
        "," +
        randomNumber() +
        "," +
        randomNumber() +
        ")"
    );
};

divEx3.addEventListener("mouseup", function (e) {
    console.log("mouseup", randomColor);
    e.target.style.backgroundColor = randomColor();
});
divEx3.addEventListener("mousedown", function (e) {
    console.log("mousedown");
    e.target.style.backgroundColor = randomColor();
});

// Make a page that has on it an element that is 200px by 200px in size and has a solid
// background color. Nest within that element another element that is 50px by 50px in
// size and has a different solid background color. When the user clicks on the outer
// element its background color should change to a randomly selected color. However,
// if the user clicks on the inner element, the inner element's background color should
// change to a randomly selected background color but the outer element's background
// color should not change at all.

var outerDiv = document.getElementById("exercise-4");
var innerDiv = document.getElementById("ex4-inner-div");

outerDiv.addEventListener("click", function (e) {
    e.target.style.backgroundColor = randomColor();
});

innerDiv.addEventListener("click", function (e) {
    e.stopPropagation();
    e.target.style.backgroundColor = randomColor();
});
