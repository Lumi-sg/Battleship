import css from "./styles.css";
import { Ship } from "./modules/Ship";
import { Gameboard } from "./modules/Gameboard";
import { Player } from "./modules/Player";
import { displayGameBoard } from "./modules/displayGameBoard";

let playerGameBoard = new Gameboard(10);
let playerOne = new Player("Human", playerGameBoard);

let cpuGameBoard = new Gameboard(10);
let cpuOne = new Player("CPU", cpuGameBoard);

placePlayerShips();

placeCPUShips();

const p1Container = document.querySelector(".gameboard.playerBoard");
const cpuContainer = document.querySelector(".gameboard.cpuBoard");

playerOne.renderGameboard(p1Container, playerOne.gameboard.board);
cpuOne.renderGameboard(cpuContainer, cpuOne.gameboard.board);

console.table(playerOne.gameboard.board);
console.table(cpuOne.gameboard.board);
function placeCPUShips() {
	const cpuShipOne = new Ship(2, [0, 1], "horizontal");
	cpuOne.placeShip(cpuShipOne, { row: 2, col: 0 }, "horizontal");

	const cpuShipTwo = new Ship(3, [20, 21, 22], "vertical");
	cpuOne.placeShip(cpuShipTwo, { row: 0, col: 9 }, "vertical");

	const cpuShipThree = new Ship(3, [39, 49, 59], "horizontal");
	cpuOne.placeShip(cpuShipThree, { row: 9, col: 2 }, "horizontal");

	const cpuShipFour = new Ship(4, [63, 73, 83, 93], "horizontal");
	cpuOne.placeShip(cpuShipFour, { row: 5, col: 5 }, "horizontal");

	const cpuShipFive = new Ship(5, [45, 46, 47, 48, 49], "vertical");
	cpuOne.placeShip(cpuShipFive, { row: 4, col: 7 }, "vertical");
}

function placePlayerShips() {
	const playerShipTwo = new Ship(2, [5, 6], "vertical");
	playerOne.placeShip(playerShipTwo, { row: 4, col: 2 }, "vertical");

	const playerShipOne = new Ship(3, [1, 2, 3], "horizontal");
	playerOne.placeShip(playerShipOne, { row: 0, col: 0 }, "horizontal");

	const playerShipThree = new Ship(3, [8, 9, 10], "horizontal");
	playerOne.placeShip(playerShipThree, { row: 2, col: 6 }, "horizontal");

	const playerShipFour = new Ship(4, [47, 57, 67, 77], "vertical");
	playerOne.placeShip(playerShipFour, { row: 4, col: 6 }, "vertical");

	const playerShipFive = new Ship(5, [15, 25, 35, 45, 55], "horizontal");
	playerOne.placeShip(playerShipFive, { row: 8, col: 1 }, "horizontal");
}
