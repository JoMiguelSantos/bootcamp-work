function logType(arg) {
	if (typeof arg === "symbol") return console.log("I have no idea!")
	if (typeof arg === "bigint") return console.log("bigint!")
	if (Array.isArray(arg)) return console.log("array!")
	if (isNaN(arg) && typeof arg === "number") return console.log("not a number!")
	if (arg === null) return console.log("null!")
	switch (typeof arg) {
		case "undefined":
			return console.log("undefined!")
		case "number":
			return console.log("number!")
		case "string":
			return console.log("string!")
		case "function":
			return console.log("function!")
		case "object":
			return console.log("object!")
		case "boolean":
			return console.log("boolean!")
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
