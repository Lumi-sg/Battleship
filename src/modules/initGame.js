import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";
import { Player } from "./Player";
import boardEventGameLoop from "./boardEventGameLoop";

export default function initGame() {
	let playerGameBoard = new Gameboard(10);
	let playerOne = new Player("Human", playerGameBoard);
	let cpuGameBoard = new Gameboard(10);
	let cpuOne = new Player("CPU", cpuGameBoard);
	placePlayerShips();
	placeCPUShips();
	playerOne.shipCounter();
	cpuOne.shipCounter();
	const p1Container = document.querySelector(".gameboard.playerBoard");
	const cpuContainer = document.querySelector(".gameboard.cpuBoard");
	playerOne.gameboard.renderGameboard(p1Container, playerOne.gameboard.board);
	cpuOne.gameboard.renderGameboard(cpuContainer, cpuOne.gameboard.board);
	playerOne.changeTurn();

	boardEventGameLoop(playerOne, cpuOne);

	function placeCPUShips() {
		const cpuShipTwo = new Ship(2, [28, 38], "vertical");
		cpuOne.placeShip(cpuShipTwo, { row: 3, col: 9 }, "vertical");

		const cpuShipOne = new Ship(3, [46, 47, 48], "horizontal");
		cpuOne.placeShip(cpuShipOne, { row: 4, col: 1 }, "horizontal");

		const cpuShipThree = new Ship(3, [25, 26, 27], "horizontal");
		cpuOne.placeShip(cpuShipThree, { row: 7, col: 4 }, "horizontal");

		const cpuShipFour = new Ship(4, [18, 28, 38, 48], "vertical");
		cpuOne.placeShip(cpuShipFour, { row: 0, col: 6 }, "vertical");

		const cpuShipFive = new Ship(5, [32, 42, 52, 62, 72], "horizontal");
		cpuOne.placeShip(cpuShipFive, { row: 2, col: 0 }, "horizontal");

		const cpuShipSix = new Ship(2, [28, 38], "horizontal");
		cpuOne.placeShip(cpuShipSix, { row: 9, col: 7 }, "horizontal");
	}
	function placePlayerShips() {
		const playerShipTwo = new Ship(2, [5, 6], "vertical");
		playerOne.placeShip(playerShipTwo, { row: 4, col: 2 }, "vertical");

		const playerShipSix = new Ship(2, [5, 6], "vertical");
		playerOne.placeShip(playerShipSix, { row: 0, col: 5 }, "vertical");

		const playerShipOne = new Ship(3, [1, 2, 3], "horizontal");
		playerOne.placeShip(playerShipOne, { row: 0, col: 0 }, "horizontal");

		const playerShipThree = new Ship(3, [8, 9, 10], "horizontal");
		playerOne.placeShip(playerShipThree, { row: 2, col: 7 }, "horizontal");

		const playerShipFour = new Ship(4, [47, 57, 67, 77], "vertical");
		playerOne.placeShip(playerShipFour, { row: 4, col: 7 }, "vertical");

		const playerShipFive = new Ship(5, [15, 25, 35, 45, 55], "horizontal");
		playerOne.placeShip(playerShipFive, { row: 8, col: 1 }, "horizontal");
	}
}
