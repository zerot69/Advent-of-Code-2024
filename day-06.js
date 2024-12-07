const fs = require("fs");

const input = fs.readFileSync("day-06.txt", "utf-8");
const lines = input.trim().split("\n");

const directions = [
	{ dx: -1, dy: 0 }, // Up
	{ dx: 0, dy: 1 }, // Right
	{ dx: 1, dy: 0 }, // Down
	{ dx: 0, dy: -1 }, // Left
];

let resultPart1 = 0;
let resultPart2 = 0;

let startX,
	startY,
	startDirection = 0;

for (let i = 0; i < lines.length; i++) {
	const j = lines[i].indexOf("^");
	if (j !== -1) {
		startX = i;
		startY = j;
		break;
	}
}

function createsLoop(grid, obstacleX, obstacleY) {
	const rows = grid.length;
	const cols = grid[0].length;

	let x = startX,
		y = startY,
		direction = startDirection;
	const visitedStates = new Set();
	while (true) {
		const state = `${x},${y},${direction}`;
		if (visitedStates.has(state)) {
			return true;
		}
		visitedStates.add(state);
		const nextX = x + directions[direction].dx;
		const nextY = y + directions[direction].dy;
		if (nextX < 0 || nextX >= rows || nextY < 0 || nextY >= cols) {
			return false;
		}
		if ((nextX === obstacleX && nextY === obstacleY) || grid[nextX][nextY] === "#") {
			direction = (direction + 1) % 4;
		} else {
			x = nextX;
			y = nextY;
		}
	}
}

const visited = new Set();
visited.add(`${startX},${startY}`);

let x = startX,
	y = startY,
	direction = startDirection;
while (true) {
	const nextX = x + directions[direction].dx;
	const nextY = y + directions[direction].dy;
	if (nextX < 0 || nextX >= lines.length || nextY < 0 || nextY >= lines[0].length) {
		break;
	}
	if (lines[nextX][nextY] === "#") {
		direction = (direction + 1) % 4;
	} else {
		x = nextX;
		y = nextY;
		visited.add(`${x},${y}`);
	}
}

resultPart1 = visited.size;
const rows = lines.length;
const cols = lines[0].length;

for (let i = 0; i < rows; i++) {
	for (let j = 0; j < cols; j++) {
		if ((i === startX && j === startY) || lines[i][j] === "#") {
			continue;
		}
		if (createsLoop(lines, i, j)) {
			resultPart2++;
		}
	}
}

console.log("Part 1:", resultPart1);
console.log("Part 2:", resultPart2);
