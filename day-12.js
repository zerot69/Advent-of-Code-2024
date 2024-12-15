const fs = require("fs");

const input = fs.readFileSync("day-12.txt", "utf-8");

let resultPart1 = 0;
let resultPart2 = 0;
const map = input
	.trim()
	.split("\r\n")
	.map((row) => row.split(""));

const rows = map.length;
const cols = map[0].length;
const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

function dfs(x, y, type) {
	const stack = [[x, y]];
	let area = 0;
	let perimeter = 0;
	let corners = 0;

	function isSamePlant(nx, ny) {
		return nx >= 0 && nx < rows && ny >= 0 && ny < cols && map[nx][ny] === type;
	}

	while (stack.length > 0) {
		const [cx, cy] = stack.pop();
		if (visited[cx][cy]) continue;
		visited[cx][cy] = true;
		area++;

		for (const [dx, dy] of [
			[0, 1],
			[1, 0],
			[0, -1],
			[-1, 0],
		]) {
			const nx = cx + dx;
			const ny = cy + dy;
			if (nx < 0 || ny < 0 || nx >= rows || ny >= cols || map[nx][ny] !== type) {
				perimeter++;
			} else if (!visited[nx][ny]) {
				stack.push([nx, ny]);
			}
		}

		const directions = [
			[-1, -1],
			[-1, 0],
			[-1, 1],
			[0, -1],
			[0, 1],
			[1, -1],
			[1, 0],
			[1, 1],
		];

		const checks = directions.map(([dx, dy]) => isSamePlant(cx + dx, cy + dy));
		const [NW, N, NE, W, E, SW, S, SE] = checks;

		corners += (N && W && !NW) + (N && E && !NE) + (S && W && !SW) + (S && E && !SE) + (!N && !W) + (!N && !E) + (!S && !W) + (!S && !E);
	}

	return { area, perimeter, cost: corners * area };
}

for (let i = 0; i < rows; i++) {
	for (let j = 0; j < cols; j++) {
		if (!visited[i][j]) {
			const { area, perimeter, cost } = dfs(i, j, map[i][j]);
			resultPart1 += area * perimeter;
			resultPart2 += cost;
		}
	}
}

console.log("Part 1:", resultPart1);
console.log("Part 2:", resultPart2);
