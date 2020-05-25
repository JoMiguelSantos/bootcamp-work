// Make a JSON validator website. It should have a <textarea> where users can input their JSON.
// After clicking a button a message should appear, telling users if the JSON is valid or not.
function validateJSON(input) {
    try {
        JSON.parse(input);
        return "Your JSON code is valid";
    } catch (err) {
        return (
            "Your JSON code is not valid. The following error occurred: " + err
        );
    }
}

$("form").on("submit", function (event) {
    event.preventDefault();
    $(".validation__message").html(
        validateJSON(event.target.querySelector("textarea").value)
    );
});

// Write a function called translateNumberToGerman that tries to get a number between 1 and 10
// by calling another function called askForNumber. Here is the askForNumber function you should use:

// If askForNumber returns a number between 1 and 10, translateNumberToGerman should return the German
// translation of that number as a string.

// If askForNumber does not return a number between 1 and 10 and instead throws an exception,
// translateNumberToGerman should log the error message to the console and restart the whole process.
// The user should keep being prompted to input a number between 1 and 10 until she does so.

function askForNumber() {
    var num = prompt("Please enter a number between 1 and 10");
    if (num >= 1 && num <= 10 && num == parseInt(num)) {
        return num;
    }
    throw new Error("Bad number");
}

var germanTranslations = {
    1: "Eins",
    2: "Zwei",
    3: "Drei",
    4: "Vier",
    5: "Fünf",
    6: "Sechs",
    7: "Sieben",
    8: "Acht",
    9: "Neun",
    10: "Zehn",
};

function translateNumberToGerman() {
    try {
        var translation = germanTranslations[askForNumber()];
        alert(translation);
        return translation;
    } catch (err) {
        console.log(err);
        translateNumberToGerman();
    }
}

translateNumberToGerman();
