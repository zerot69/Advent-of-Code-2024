const fs = require("fs");

const input = fs.readFileSync("day-03.txt", "utf-8");

let isDisabled = false;
let resultPart1 = 0;
let resultPart2 = 0;

input.replace(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g, (match, a, b) => {
	if (match.startsWith("mul")) {
		a = parseInt(a);
		b = parseInt(b);
		resultPart1 += a * b;
		if (!isDisabled) resultPart2 += a * b;
	} else if (match === "do()") isDisabled = false;
	else if (match === "don't()") isDisabled = true;
});

console.log("Part 1:", resultPart1);
console.log("Part 2:", resultPart2);
