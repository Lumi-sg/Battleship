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

	placeShip(ship, position, orientation) {
		const newShip = new Ship(ship.shipLength, position, orientation);
		return this.gameboard.addShip(newShip);
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
		const attack = availableSpots[randomLocation];
		this.gameboard.receiveAttack(attack.row, attack.col);
		return true;
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
