import { Gameboard } from "./Gameboard";
import { Player } from "./Player";
import boardEventGameLoop from "./boardEventGameLoop";
import placePlayerShips from "./placePlayerShips";

export default function initGame() {
	const p1Container = document.querySelector(".gameboard.playerBoard");
	const cpuContainer = document.querySelector(".gameboard.cpuBoard");
	let playerGameBoard = new Gameboard(10);
	let playerOne = new Player("Human", playerGameBoard);
	let cpuGameBoard = new Gameboard(10);
	let cpuOne = new Player("CPU", cpuGameBoard);

	placeCPUShips();
	cpuOne.gameboard.renderCPUGameBoard(cpuContainer, cpuOne.gameboard.board);

	playerOne.gameboard.renderPlayerBoard(p1Container, playerOne.gameboard.board);
	placePlayerShips();
	playerOne.shipCounter();
	cpuOne.shipCounter();

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
}
