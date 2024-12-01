const fs = require("fs");

const input = fs.readFileSync("day-01.txt", "utf-8");

const lines = input.split("\n");
const firstArray = [];
const secondArray = [];
const secondArrayInstances = {};

lines.forEach((line) => {
	const [x, y] = line.split("   ").map(Number);
	firstArray.push(x);
	secondArray.push(y);
	secondArrayInstances[y] = (secondArrayInstances[y] || 0) + 1;
});

firstArray.sort((a, b) => a - b);
secondArray.sort((a, b) => a - b);

const resultPart1 = firstArray.reduce((acc, val, i) => acc + Math.abs(val - secondArray[i]), 0);
let resultPart2 = 0;

for (let i = 0; i < firstArray.length; i++) {
	resultPart2 += firstArray[i] * (secondArrayInstances[firstArray[i]] || 0);
}

console.log("Part 1:", resultPart1);
console.log("Part 2:", resultPart2);
