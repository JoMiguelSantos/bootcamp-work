// 1. Write a function that takes any number of numbers as arguments and returns the sum of those numbers.

// sum(5, 10); //15

// sum(5, 10, 15); //30;

// sum(5, 10, 15, 100, 200); //330

function sumAll() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    console.log(sum);
    return sum;
}

sumAll(5, 10);
sumAll(5, 10, 15);
sumAll(5, 10, 15, 100, 200);

// 2. Write a function that takes another function as an argument.
// It should wait 1.5 seconds and then run the function that was passed in.

function runLater(cb) {
    setTimeout(cb, 1500);
}

function waitThenRun() {
    console.log("Hello!");
    setTimeout(function () {
        console.log("Goodbye!");
    }, 1500);
}

runLater(waitThenRun);

// 3. Write a function that expects a number as an argument.
// If the value that is passed in is less than 0, equal to 0, or not a number,
// the function should return the string 'ERROR'. If the number that is passed
// in is greater than or equal to 1000000 it should simply return the number.
// Otherwise it should multiply the number by 10 however many times it takes to get
// a number that is greater than or equal to 1000000 and return that.

function multiplyTill1M(arg) {
    if (typeof arg !== "number" || isNaN(arg) || arg <= 0) {
        console.log("ERROR");
        return "ERROR";
    }
    while (arg < 1000000) {
        arg *= 10;
    }
    console.log(arg);
    return arg;
}

multiplyTill1M(10);
multiplyTill1M(0);
multiplyTill1M("string");

// Bonus exercise
// Write a function that returns a function that can be called repeatedly and passed
// a number each time. Each time it is called it should return the sum of the number
// that is passed in and all other numbers that were passed in previous calls.
// That is, it should return the sum of all the numbers that were ever passed to it.

function getTotaler() {
    var num = 0;
    return function (addThis) {
        num += addThis;
        console.log(num);
        return num;
    };
}

var totaler = getTotaler();
totaler(1); //1
totaler(2); //3
totaler(5); //8
