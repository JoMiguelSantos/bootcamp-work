// Write a function that takes an array as an argument and returns a new array containing all of
// the items that are in the array that was passed in but in reverse order. This function should

// leave the original array unchanged

// contain no loops of any kind. That includes for, for...in, for...of, while, and do...while

// not call slice or any other method on the original array

// not call push or concat on any array in any way

function reverseArr(arr) {
    return [...arr].reverse();
}

console.log(reverseArr([1, 2, 3, 4, 5, 6]));

// Write a function that takes two arrays as arguments and returns a new array containing all of
// the items in the two arrays passed to it. This function should

// leave the original arrays unchanged

// contain no loops of any kind. That includes for, for...in, for...of, while, or do...while

// not call slice or any other method on the two arrays passed to it

// not call push or concat on any array in any way

function combineArrays(arr1, arr2) {
    return [...arr1, ...arr2];
}

console.log(combineArrays([1, 2, 3], [4, 5, 6]));

// Rewrite the following function to use destructuring assignment for the three variables it creates:

function logInfo(city) {
    const { name, country, numPeople } = city;
    console.log(`${name} is in ${country} and has ${numPeople} in it.`);
}

logInfo({
    name: "Berlin",
    country: "Germany",
    numPeople: "3.5 million people",
});

// The three highlighted lines should be replaced with a single line.

// Pretend that it is 2002 and rewrite the following hipster Javascript so it will work in Internet Explorer 5 and Netscape 4.

// let getNameAndCountry = ({ name, country }) => [name, country];
var getNameAndCountry = function (obj) {
    return [obj.name, obj.country];
};
var getRelocatedCity = function (city1, city2 = { country: "Germany" }) {
    var country = getNameAndCountry(city2)[1];
    return Object.assign({}, { name: city1 }, { country });
};
// let getRelocatedCity = (city1, city2 = { country: "Germany" }) => {
//     let [, country] = getNameAndCountry(city2);
//     return {
//         ...city1,
//         country,
//     };
// };

console.log(getRelocatedCity("Lisbon", { name: "Berlin", country: "Germany" }));
