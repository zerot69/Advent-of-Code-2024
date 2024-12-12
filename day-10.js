const fs = require("fs");

const input = fs.readFileSync("day-10.txt", "utf-8");

function calculateScores(map) {
	const rows = map.length;
	const cols = map[0].length;
	function isValidStep(x, y, height, visited) {
		return x >= 0 && x < rows && y >= 0 && y < cols && !visited[x][y] && map[x][y] === height;
	}
	function findUniqueEndpoints(x, y, height, visited, endpoints) {
		if (height === 9) {
			endpoints.add(`${x},${y}`);
			return;
		}
		const nextHeight = height + 1;
		visited[x][y] = true;
		const directions = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		];
		for (const [dx, dy] of directions) {
			const nx = x + dx;
			const ny = y + dy;
			if (isValidStep(nx, ny, nextHeight, visited)) {
				findUniqueEndpoints(nx, ny, nextHeight, visited, endpoints);
			}
		}
		visited[x][y] = false;
	}
	let totalScore = 0;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (map[i][j] === 0) {
				const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
				const endpoints = new Set();
				findUniqueEndpoints(i, j, 0, visited, endpoints);
				totalScore += endpoints.size;
			}
		}
	}
	return totalScore;
}

function calculateRatings(map) {
	const rows = map.length;
	const cols = map[0].length;
	function isValidStep(x, y, height, visited) {
		return x >= 0 && x < rows && y >= 0 && y < cols && !visited[x][y] && map[x][y] === height;
	}
	function countTrailsFrom(x, y, height, visited) {
		if (height === 9) return 1;
		let trails = 0;
		const nextHeight = height + 1;
		visited[x][y] = true;
		const directions = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		];
		for (const [dx, dy] of directions) {
			const nx = x + dx;
			const ny = y + dy;
			if (isValidStep(nx, ny, nextHeight, visited)) {
				trails += countTrailsFrom(nx, ny, nextHeight, visited);
			}
		}
		visited[x][y] = false;
		return trails;
	}
	let totalRating = 0;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (map[i][j] === 0) {
				const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
				totalRating += countTrailsFrom(i, j, 0, visited);
			}
		}
	}
	return totalRating;
}

const topographicMap = input.split("\r\n").map((row) => row.split("").map(Number));
const resultPart1 = calculateScores(topographicMap);
const resultPart2 = calculateRatings(topographicMap);

console.log("Part 1:", resultPart1);
console.log("Part 2:", resultPart2);
