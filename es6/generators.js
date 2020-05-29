// Implement FizzBuzz using a generator function and a for...of loop.

// First, write a generator function that yields the numbers between 1 and
// 100 in order with the following exceptions

// If the number is divisible by 3, yield the string "fizz"

// If the number is divisible by 5, yield the string "buzz"

// If the number is divisible by both 3 and 5, yield the string "fizzbuzz"

function* fizzbuzzGen(numArr) {
    for (let num of numArr) {
        if (num % 3 === 0) {
            if (num % 5 === 0) {
                yield "fizzbuzz";
            } else {
                yield "fizz";
            }
        } else if (num % 5 === 0) {
            yield "buzz";
        } else {
            yield num;
        }
    }
}

const genFizzBuzz = fizzbuzzGen([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
]);

// Then write a for...of loop that loops through the values yielded by
// the generator function and logs each one
for (let num of genFizzBuzz) {
    console.log(num);
}

// Write a generator function that expects to be passed an array of values.
// When next is called on the iterator object that this function returns,
// the values in the array should be yielded in reverse order. The array
// that is passed to the generator function should stay in its original order.
function* reverseArrGen(arr) {
    const reversedArr = [...arr].reverse();
    for (let item of reversedArr) {
        yield item;
    }
}

const genReverse = reverseArrGen([1, 2, 3, 4, 5]);
console.log(genReverse.next().value);
console.log(genReverse.next().value);
console.log(genReverse.next().value);

// Bonus Exercise
// Write a function that returns an array containing all the values passed
// to it in the order in which they are passed. When the spread operator
// is used on this array, the values in the array should be produced in
// reverse order.
function makeWeirdArray(...values) {
    const weirdArr = {
        [Symbol.iterator]: function* () {
            const weirdObjLen = Object.keys(this).length - 1;
            for (let i = weirdObjLen; i >= 0; i--) {
                yield this[i];
            }
        },
    };
    let i = 0;
    for (const value of values) {
        weirdArr[i] = value;
        i++;
    }
    return weirdArr;
}

const a = makeWeirdArray(10, 20, 30, 40);

console.log(a[0]); // 10

console.log(a[1]); // 20

console.log(a[2]); // 30

console.log(a[3]); // 40

console.log([...a]); // [30, 20, 10];
