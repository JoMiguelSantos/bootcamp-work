// Write a constructor called Rectangle that accepts two numbers (width and height) as parameters.
// Rectangle instances should have a method called getArea that returns the instance's width multiplied by
// its height. Write another constructor called Square that accepts one number (which will serve as both
// width and the height) as a parameter. Instances of Square should also have a getArea method but you should
// not rewrite the getArea function you wrote for Rectangle. Square instances should use the same getArea
// method that Rectangle instances do.

function Rectangle(width, height) {
    this.width = width;
    this.height = height;

    this.getArea = function () {
        return this.width * this.height;
    };
}

function Square(n) {
    this.width = n;
    this.height = n;
    Rectangle.apply(this, [n, n]);
}

var square = new Square(4);
console.log(square.getArea()); //16

var rect = new Rectangle(4, 5);
console.log(rect.getArea()); //20

// Write a function called invertCase that expects a string as a parameter. This function should return a new
// string with all the same characters as the string that was passed in but with the cases of the alphabetic
// characters switched. Uppercase characters should become lowercase and lowercase letters should become
// uppercase. Characters that are not alphabetic should not change. The toUpperCase and toLowerCase methods
// that all strings have will come in handy here.

function invertCase(str) {
    var caseInvertedStr = "";
    for (var i = 0; i < str.length; i++) {
        if (str[i] === str[i].toLowerCase()) {
            caseInvertedStr += str[i].toUpperCase();
        } else {
            caseInvertedStr += str[i].toLowerCase();
        }
    }
    return caseInvertedStr;
}

console.log(invertCase("RaNdOm WoRd"));

// Bonus Exercise
// Write a constructor called Countdown that accepts a single argument - the number of seconds to count down.
// It should be possible to call the start method of instances of Countdown to initiate the countdown.
// Once the countdown starts, it should count down to zero starting with the number that was passed to the
// constructor and logging each number to the console with a one second delay.

function Countdown(count) {
    this.count = count;
    this.start = function () {
        var endTime = Date.now() + count * 1000;
        var me = this;
        var countdownTimer = setInterval(function () {
            if (endTime + 1000 < Date.now()) {
                clearInterval(countdownTimer);
            }
            console.log(me.count);
            me.count--;
        }, 1000);
    };
}

var countdown = new Countdown(15);
countdown.start();
