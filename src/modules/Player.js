import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";

export class Player {
	constructor(name, gameboard, turn = false) {
		this.name = name;
		this.gameboard = gameboard;
		this.turn = turn;
	}

	isTurn() {
		if (this.turn) {
			return true;
		}
		return false;
	}

	changeTurn() {
		if (this.turn) {
			this.turn = false;
		} else {
			this.turn = true;
		}
	}

	placeRandomShip(size) {
		let randomPosition = generateRandomPosition(this.gameboard.boardSize);
		let randomOrientation = generateRandomOrientation();

		let shipAdded = false;

		while (!shipAdded) {
			shipAdded = this.gameboard.addShip(size, randomPosition, randomOrientation);

			if (shipAdded) {
				console.log(`Ship with length ${size} added successfully!`);
			} else {
				console.log(`Unable to add ship with length ${size}. Retrying...`);
				randomPosition = generateRandomPosition(this.gameboard.boardSize);
				randomOrientation = generateRandomOrientation();
			}
		}

		function generateRandomPosition(boardSize) {
			const row = Math.floor(Math.random() * boardSize);
			const col = Math.floor(Math.random() * boardSize);
			return { row, col };
		}

		function generateRandomOrientation() {
			const orientations = ["horizontal", "vertical"];
			const randomIndex = Math.floor(Math.random() * orientations.length);
			return orientations[randomIndex];
		}
	}

	receiveAttack(row, col) {
		return this.gameboard.receiveAttack(row, col);
	}

	attackRandomSpot() {
		const availableSpots = [];
		for (let row = 0; row < this.gameboard.boardSize; row++) {
			for (let col = 0; col < this.gameboard.boardSize; col++) {
				const boardPosition = this.gameboard.board[row][col];
				if (
					boardPosition === null ||
					(boardPosition instanceof Ship && !boardPosition.isHit(row, col))
				) {
					availableSpots.push({ row, col });
				}
			}
		}
		if (availableSpots.length === 0) {
			return false;
		}
		const randomLocation = Math.floor(Math.random() * availableSpots.length);
		const attack = updatePlayerBoard();
		this.gameboard.receiveAttack(attack.row, attack.col);
		return true;

		function updatePlayerBoard() {
			const attack = availableSpots[randomLocation];
			const attackedSquare = document.querySelector(
				`.humanSquare[data-row="${attack.row}"][data-col="${attack.col}"]`
			);
			if (attackedSquare.classList.contains("ship")) {
				attackedSquare.textContent = "✕";
			} else {
				attackedSquare.textContent = "⚬";
			}
			return attack;
		}
	}

	shipCounter() {
		const playerShipsHTML = document.querySelector(".playerShips");
		const cpuShipsHTML = document.querySelector(".cpuShips");
		if (this.name === "Human") {
			playerShipsHTML.textContent = `Player Ships Remaining: ${this.gameboard.numberOfShips()}`;
		} else if (this.name === "CPU") {
			cpuShipsHTML.textContent = `CPU Ships Remaining: ${this.gameboard.numberOfShips()}`;
		}
	}

	hasLost() {
		return this.gameboard.allShipsSunk();
	}
}
