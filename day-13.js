const fs = require("fs");

function parseMachineData(filePath) {
	const data = fs.readFileSync(filePath, "utf8");
	const machineRegex = /Button A: X\+(\d+), Y\+(\d+)\s+Button B: X\+(\d+), Y\+(\d+)\s+Prize: X=(\d+), Y=(\d+)/g;
	const machines = [];
	let match;
	while ((match = machineRegex.exec(data)) !== null) {
		const [_, aX, aY, bX, bY, prizeX, prizeY] = match;
		machines.push({
			a: { x: parseInt(aX), y: parseInt(aY), cost: 3 },
			b: { x: parseInt(bX), y: parseInt(bY), cost: 1 },
			prize: { x: parseInt(prizeX), y: parseInt(prizeY) },
		});
	}
	return machines;
}

function solveClawMachines(machines, partTwo = false) {
	let totalCost = 0;
	const prizeOffset = partTwo ? 10_000_000_000_000 : 0;
	function solveMachine(machine) {
		const prize = {
			x: machine.prize.x + prizeOffset,
			y: machine.prize.y + prizeOffset,
		};
		const det = machine.a.x * machine.b.y - machine.a.y * machine.b.x;
		if (det === 0) return 0;
		const a = (prize.x * machine.b.y - prize.y * machine.b.x) / det;
		const b = (machine.a.x * prize.y - machine.a.y * prize.x) / det;
		if (Math.floor(a) === a && Math.floor(b) === b) {
			return a * 3 + b;
		} else {
			return 0;
		}
	}
	for (const machine of machines) {
		const cost = solveMachine(machine);
		if (cost > 0) {
			totalCost += cost;
		}
	}
	return totalCost;
}

const machines = parseMachineData("day-13.txt");
const resultPart1 = solveClawMachines(machines);
const resultPart2 = solveClawMachines(machines, true);

console.log("Part 1:", resultPart1);
console.log("Part 2:", resultPart2);
