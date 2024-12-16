const fs = require("fs");

const input = fs.readFileSync("day-14.txt", "utf-8");
const width = 101;
const height = 103;

let resultPart1 = 0;
let resultPart2 = 0;

const quadrants = [0, 0, 0, 0];
const robots = input
	.trim()
	.split("\n")
	.map((line) => {
		const [position, velocity] = line.split(" ");
		const [px, py] = position.split("=")[1].split(",").map(Number);
		const [vx, vy] = velocity.split("=")[1].split(",").map(Number);
		let x = (px + vx * 100 + width * 100) % width;
		let y = (py + vy * 100 + height * 100) % height;
		if (x !== Math.floor(width / 2) && y !== Math.floor(height / 2)) {
			const quadrant = Math.floor(x / Math.ceil(width / 2)) + Math.floor(y / Math.ceil(height / 2)) * 2;
			quadrants[quadrant]++;
		}
		return { position: { x: px, y: py }, velocity: { x: vx, y: vy } };
	});

resultPart1 = quadrants.reduce((mul, num) => mul * num, 1);
console.log("Part 1:", resultPart1);

let step = 0;

while (true) {
	step++;
	const positions = new Set();
	for (let robot of robots) {
		robot.position.x = (robot.position.x + robot.velocity.x + width) % width;
		robot.position.y = (robot.position.y + robot.velocity.y + height) % height;
		positions.add(`${robot.position.x},${robot.position.y}`);
	}
	let foundGroup = false;
	for (let position of positions) {
		const [x, y] = position.split(",").map(Number);
		let hasGroup = true;
		for (let j = -2; j <= 2; j++) {
			for (let k = -2; k <= 2; k++) {
				if (!positions.has(`${x + k},${y + j}`)) {
					hasGroup = false;
					break;
				}
			}
			if (!hasGroup) break;
		}
		if (hasGroup) {
			resultPart2 = step;
			foundGroup = true;
			break;
		}
	}
	if (foundGroup) break;
}

console.log("Part 2:", resultPart2);
