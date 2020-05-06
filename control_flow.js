function logType(arg) {
	if (typeof arg === "symbol") {
		return console.log("symbol!")
	} else if (typeof arg === "bigint") {
		return console.log("bigint!")
	} else if (Array.isArray(arg)) {
		return console.log("array!")
	} else if (isNaN(arg) && typeof arg === "number") {
		return console.log("not a number!")
	} else if (arg === null) {
		return console.log("null!")
	} else if (typeof arg === "undefined") {
		return console.log("undefined!")
	} else if (typeof arg === "number") {
		return console.log("number!")
	} else if (typeof arg === "string") {
		return console.log("string!")
	} else if (typeof arg === "function") {
		return console.log("function!")
	} else if (typeof arg === "object") {
		return console.log("object!")
	} else if (typeof arg === "boolean") {
		return console.log("boolean!")
	} else {
		return console.log("I have no idea!")
	}
}

logType([1,2,3])
logType(NaN)
logType(null)
logType(undefined)
logType(12)
logType("string")
logType(1000n)
logType({a: 1})
logType(logType)
logType(true)
logType(Symbol())

var a = {
	Berlin: 'Germany',
	Paris: 'France',
	'New York': 'USA'
};

var b = {};
for (var key in a) {
	b[a[key]] = key
}

console.log(b)

for (var i=10; i>0; i--) {
	console.log(i)
}
