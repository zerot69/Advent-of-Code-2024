const fs = require("fs");

const input = fs.readFileSync("day-11.txt", "utf-8");
const initialStones = input.split(" ").map(Number);

function evolveStones(stones, blinks) {
	const stoneCounts = new Map();
	for (const stone of stones) {
		stoneCounts.set(stone, (stoneCounts.get(stone) || 0) + 1);
	}
	for (let i = 0; i < blinks; i++) {
		const nextStoneCounts = new Map();
		for (const [stone, count] of stoneCounts.entries()) {
			if (stone === 0) {
				nextStoneCounts.set(1, (nextStoneCounts.get(1) || 0) + count);
			} else if (stone.toString().length % 2 === 0) {
				const str = stone.toString();
				const mid = str.length / 2;
				const left = parseInt(str.slice(0, mid), 10);
				const right = parseInt(str.slice(mid), 10);
				nextStoneCounts.set(left, (nextStoneCounts.get(left) || 0) + count);
				nextStoneCounts.set(right, (nextStoneCounts.get(right) || 0) + count);
			} else {
				const newStone = stone * 2024;
				nextStoneCounts.set(newStone, (nextStoneCounts.get(newStone) || 0) + count);
			}
		}
		stoneCounts.clear();
		for (const [stone, count] of nextStoneCounts.entries()) {
			stoneCounts.set(stone, count);
		}
	}
	let totalStones = 0;
	for (const count of stoneCounts.values()) {
		totalStones += count;
	}
	return totalStones;
}

const resultPart1 = evolveStones(initialStones, 25);
const resultPart2 = evolveStones(initialStones, 75);

console.log("Part 1:", resultPart1);
console.log("Part 2:", resultPart2);
