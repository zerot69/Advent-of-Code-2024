const fs = require("fs");

const input = fs.readFileSync("day-04.txt", "utf-8");
// const input = "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX";

const lines = input.split("\n");
const numRows = lines.length;
const numCols = lines[0].length;
const targetWords = ["XMAS"];

let resultPart1 = 0;
let resultPart2 = 0;

function countXMAS(row, col, word) {
	const directions = [
		{ dr: 0, dc: 1 },
		{ dr: 0, dc: -1 },
		{ dr: 1, dc: 0 },
		{ dr: -1, dc: 0 },
		{ dr: 1, dc: 1 },
		{ dr: 1, dc: -1 },
		{ dr: -1, dc: 1 },
		{ dr: -1, dc: -1 },
	];
	let count = 0;
	for (const { dr, dc } of directions) {
		let match = true;
		for (let k = 0; k < word.length; k++) {
			const r = row + k * dr;
			const c = col + k * dc;
			if (r < 0 || r >= numRows || c < 0 || c >= numCols || lines[r][c] !== word[k]) {
				match = false;
				break;
			}
		}
		if (match) count++;
	}
	return count;
}

function isX_MAS(row, col) {
	if (lines[row][col] !== "A") return false;
	const patterns = [
		[
			{ dr: -1, dc: -1, char: "M" },
			{ dr: -1, dc: 1, char: "S" },
			{ dr: 1, dc: -1, char: "M" },
			{ dr: 1, dc: 1, char: "S" },
		],
		[
			{ dr: -1, dc: -1, char: "S" },
			{ dr: -1, dc: 1, char: "M" },
			{ dr: 1, dc: -1, char: "S" },
			{ dr: 1, dc: 1, char: "M" },
		],
		[
			{ dr: -1, dc: -1, char: "M" },
			{ dr: -1, dc: 1, char: "M" },
			{ dr: 1, dc: -1, char: "S" },
			{ dr: 1, dc: 1, char: "S" },
		],
		[
			{ dr: -1, dc: -1, char: "S" },
			{ dr: -1, dc: 1, char: "S" },
			{ dr: 1, dc: -1, char: "M" },
			{ dr: 1, dc: 1, char: "M" },
		],
	];
	for (const pattern of patterns) {
		if (
			pattern.every(({ dr, dc, char }) => {
				const r = row + dr;
				const c = col + dc;
				return r >= 0 && r < numRows && c >= 0 && c < numCols && lines[r][c] === char;
			})
		) {
			return true;
		}
	}
	return false;
}

for (let row = 0; row < numRows; row++) {
	for (let col = 0; col < numCols; col++) {
		for (const word of targetWords) {
			resultPart1 += countXMAS(row, col, word);
		}
		if (isX_MAS(row, col)) {
			resultPart2++;
		}
	}
}

console.log("Part 1:", resultPart1);
console.log("Part 2:", resultPart2);
