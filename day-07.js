const fs = require("fs");

const input = fs.readFileSync("day-07.txt", "utf-8");

const lines = input.split("\n");
const equations = lines.map((line) => line.split(/ |: /).map(Number));

let resultPart1 = 0;
let resultPart2 = 0;

const operations = {
	part1: [(a, b) => a + b, (a, b) => a * b],
	part2: [(a, b) => a + b, (a, b) => a * b, (a, b) => +(String(a) + b)],
};

function evaluate(eq, i, tot, ops, memo) {
	const key = `${i},${tot}`;
	if (memo.has(key)) return memo.get(key);
	if (i >= eq.length) return tot === eq[0];
	const result = ops.some((op) => evaluate(eq, i + 1, op(tot, eq[i]), ops, memo));
	memo.set(key, result);
	return result;
}

resultPart1 = equations.reduce((sum, eq) => sum + (evaluate(eq, 2, eq[1], operations.part1, new Map()) ? eq[0] : 0), 0);
resultPart2 = equations.reduce((sum, eq) => sum + (evaluate(eq, 2, eq[1], operations.part2, new Map()) ? eq[0] : 0), 0);

console.log("Part 1:", resultPart1);
console.log("Part 2:", resultPart2);
