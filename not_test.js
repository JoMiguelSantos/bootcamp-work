var x;
var doubleX;

x = 17;

function timesTwo(num) {
    return num * 2;
}

doubleX = timesTwo(x);
console.log(doubleX); // 34

var numbers;

numbers = [x, doubleX];

for (var i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

numbers = {};

numbers.y = doubleX;

console.log(numbers); // { y: 34 }
