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

	renderGameboard(container, board) {
		for (let i = 0; i < board.length; i++) {
			const row = document.createElement("div");
			row.classList.add("row");
			for (let j = 0; j < board[i].length; j++) {
				const square = document.createElement("div");
				square.classList.add("square");
				if (board[i][j] instanceof Ship) {
					square.textContent = "S";
					square.classList.add("ship");
				}
				row.appendChild(square);
			}
			container.appendChild(row);
		}
		container.classList.add("playerBoard");
	}

	hasLost() {
		return this.gameboard.allShipsSunk();
	}
}
