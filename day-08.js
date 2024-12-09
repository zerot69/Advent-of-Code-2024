const fs = require("fs");

const input = fs.readFileSync("day-08.txt", "utf-8");

const lines = input.split("\r\n");
const grid = lines.map((line) => line.split(""));

const antennas = {};
for (let r = 0; r < grid.length; r++) {
	for (let c = 0; c < grid[r].length; c++) {
		const char = grid[r][c];
		if (char !== ".") {
			if (!antennas[char]) antennas[char] = [];
			antennas[char].push([r, c]);
		}
	}
}

const antinodes = new Set();
const harmonicAntinodes = new Set();

for (const antenna in antennas) {
	const locations = antennas[antenna];
	for (let i = 0; i < locations.length; i++) {
		for (let j = 0; j < locations.length; j++) {
			if (i === j) continue;
			const [y1, x1] = locations[i];
			const [y2, x2] = locations[j];
			const vector = [y2 - y1, x2 - x1];
			const antinode = [y2 + vector[0], x2 + vector[1]];
			if (antinode[0] >= 0 && antinode[0] < grid.length && antinode[1] >= 0 && antinode[1] < grid[0].length && !(antinode[0] === y2 && antinode[1] === x2)) {
				antinodes.add(antinode.toString());
			}
			for (let n = -100; n <= 100; n++) {
				const harmonicAntinode = [y2 + n * vector[0], x2 + n * vector[1]];
				if (harmonicAntinode[0] >= 0 && harmonicAntinode[0] < grid.length && harmonicAntinode[1] >= 0 && harmonicAntinode[1] < grid[0].length && !(harmonicAntinode[0] === y2 && harmonicAntinode[1] === x2)) {
					harmonicAntinodes.add(harmonicAntinode.toString());
				}
			}
		}
	}
}

console.log("Part 1:", antinodes.size);
console.log("Part 2:", harmonicAntinodes.size);
