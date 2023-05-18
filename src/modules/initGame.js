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
		cpuOne.placeRandomShip(5);
		cpuOne.placeRandomShip(4);
		cpuOne.placeRandomShip(3);
		cpuOne.placeRandomShip(3);
		cpuOne.placeRandomShip(2);
		cpuOne.placeRandomShip(2);
	}
	function placePlayerShips() {
		playerOne.placeRandomShip(5);
		playerOne.placeRandomShip(4);
		playerOne.placeRandomShip(3);
		playerOne.placeRandomShip(3);
		playerOne.placeRandomShip(2);
		playerOne.placeRandomShip(2);
	}
}
