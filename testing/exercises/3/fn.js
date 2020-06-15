module.exports = function fn(arg) {
    if (typeof arg === "string") {
        return arg.split("").reverse().join("");
    }

    if (Array.isArray(arg)) {
        let returnArr = [];
        for (let item of arg) {
            if (typeof item === "string") {
                returnArr.push(item.split("").reverse().join(""));
            } else {
                returnArr.push(null);
            }
        }
        return returnArr;
    }

    if (typeof arg !== "string" && !Array.isArray(arg)) {
        return null;
    }
};
