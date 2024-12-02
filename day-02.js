const fs = require("fs");

const input = fs.readFileSync("day-02.txt", "utf-8");

const lines = input.split("\n");
let resultPart1 = 0;
let resultPart2 = 0;

lines.forEach((line) => {
	const numbers = line.split(" ").map(Number);
	const diff = [];
	for (let i = 1; i < numbers.length; i++) {
		diff.push(numbers[i] - numbers[i - 1]);
	}

	const isDiffValid = diff.every((num) => 0 < num && num <= 3) || diff.every((num) => -3 <= num && num < 0);

	if (isDiffValid) {
		resultPart1++;
	} else {
		let isValid = false;
		for (let i = 0; i < numbers.length; i++) {
			const modifiedNumbers = numbers.slice(0, i).concat(numbers.slice(i + 1));
			const modifiedDiff = [];
			for (let j = 1; j < modifiedNumbers.length; j++) {
				modifiedDiff.push(modifiedNumbers[j] - modifiedNumbers[j - 1]);
			}
			if (modifiedDiff.every((num) => 0 < num && num <= 3) || modifiedDiff.every((num) => -3 <= num && num < 0)) {
				isValid = true;
				break;
			}
		}
		if (isValid) resultPart2++;
	}
});
resultPart2 += resultPart1;

console.log("Part 1:", resultPart1);
console.log("Part 2:", resultPart2);
