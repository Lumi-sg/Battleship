import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";

export class Player {
	constructor(name, gameboard) {
		this.name = name;
		this.gameboard = gameboard;
	}

	placeShip(ship, position, orientation) {
		const newShip = new Ship(ship.shipLength, position, orientation);
		return this.gameboard.addShip(newShip);
	}

	receiveAttack(row, col) {
		return this.gameboard.receiveAttack(row, col);
	}

	attackRandomSpot() {
		let availableSpots = [];
		for (let row = 0; row < this.gameboard.boardSize; row++) {
			for (let col = 0; col < this.gameboard.boardSize; col++) {
				if (!this.gameboard.board[row][col]) {
					availableSpots.push({ row, col });
				}
			}
		}
		if (availableSpots.length === 0) {
			return false; //no spots left to attack
		}
		const randomLocation = Math.floor(Math.random() * availableSpots.length);
		const { row, col } = availableSpots[randomLocation];
		return this.receiveAttack(row, col);
	}

	hasLost() {
		return this.gameboard.allShipsSunk();
	}
}
