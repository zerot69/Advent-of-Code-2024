const fs = require("fs");

const input = fs.readFileSync("day-09.txt", "utf-8");

const createDisk = (input) => {
	const chars = input.split("").map(Number);
	const size = chars.reduce((a, b) => a + b);
	const disk = new Array(size).fill(-1);
	let pos = 0;
	let id = 0;
	for (let i = 0; i < chars.length; i++) {
		if (i % 2 === 0) {
			const blocks = chars[i];
			for (let j = 0; j < blocks; j++) {
				disk[pos] = id;
				pos++;
			}
			id++;
		} else {
			pos += chars[i];
		}
	}

	return disk;
};

const checksumPart1 = (disk) => {
	for (let i = disk.length - 1; i > 0; i--) {
		if (disk[i] > -1) {
			let free = disk.indexOf(-1);
			disk[free] = disk[i];
			disk[i] = -1;
			if (i === disk.indexOf(-1)) break;
		}
	}
	return disk.map((value, index) => (value > -1 ? value * index : 0)).reduce((a, b) => a + b, 0);
};

const checksumPart2 = (disk) => {
	let id = Math.max(...disk);
	while (id >= 0) {
		const blockStart = disk.indexOf(id);
		const blockLen = disk.filter((x) => x === id).length;
		let freeStart = disk.indexOf(-1);
		let freeLen = 0;
		for (let i = freeStart; i < blockStart; i++) {
			if (disk[i] === -1) {
				freeLen++;
			} else {
				if (blockLen <= freeLen) break;
				i = disk.indexOf(-1, i);
				freeStart = i;
				freeLen = 1;
			}
		}
		if (blockLen <= freeLen) {
			for (let i = freeStart; i < freeStart + blockLen; i++) {
				disk[i] = id;
			}
			for (let i = blockStart; i < blockStart + blockLen; i++) {
				disk[i] = -1;
			}
		}
		id--;
	}
	return disk.map((value, index) => (value > -1 ? value * index : 0)).reduce((a, b) => a + b, 0);
};

const disk = createDisk(input);
const resultPart1 = checksumPart1([...disk]);
const resultPart2 = checksumPart2([...disk]);

console.log("Part 1:", resultPart1);
console.log("Part 2:", resultPart2);
