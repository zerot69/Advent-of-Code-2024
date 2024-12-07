const fs = require("fs");

const input = fs.readFileSync("day-05.txt", "utf-8");

const lines = input.split("\r\n");

function isCorrectlyOrdered(update, rule) {
	const [firstPage, secondPage] = rule;
	const firstPageIndex = update.indexOf(firstPage);
	const secondPageIndex = update.indexOf(secondPage);
	return firstPageIndex === -1 || secondPageIndex === -1 || firstPageIndex < secondPageIndex;
}

function isCorrect(update, rules) {
	return rules.every((rule) => isCorrectlyOrdered(update, rule));
}

function correctUpdate(update, rules) {
	let isCorrect = false;
	while (!isCorrect) {
		isCorrect = true;
		for (const rule of rules) {
			const [firstPage, secondPage] = rule;
			const firstPageIndex = update.indexOf(firstPage);
			const secondPageIndex = update.indexOf(secondPage);
			if (firstPageIndex !== -1 && secondPageIndex !== -1 && firstPageIndex > secondPageIndex) {
				isCorrect = false;
				[update[firstPageIndex], update[secondPageIndex]] = [update[secondPageIndex], update[firstPageIndex]];
			}
		}
	}
	return update;
}

let rules = [];
let updates = [];

lines.forEach((line) => {
	if (line.includes("|")) {
		rules.push(line.split("|"));
	} else if (line.includes(",")) {
		updates.push(line.split(","));
	}
});

let correctUpdates = [];
let incorrectUpdates = [];

updates.reduce(
	(acc, update) => {
		if (isCorrect(update, rules)) {
			acc.correctUpdates.push(update);
		} else {
			acc.incorrectUpdates.push(update);
		}
		return acc;
	},
	{ correctUpdates: correctUpdates, incorrectUpdates: incorrectUpdates }
);

const correctedUpdates = incorrectUpdates.map((update) => correctUpdate(update, rules));

let resultPart1 = correctUpdates.reduce((sum, update) => sum + parseInt(update[Math.floor(update.length / 2)], 10), 0);
let resultPart2 = correctedUpdates.reduce((sum, update) => sum + parseInt(update[Math.floor(update.length / 2)], 10), 0);

console.log("Part 1:", resultPart1);
console.log("Part 2:", resultPart2);
