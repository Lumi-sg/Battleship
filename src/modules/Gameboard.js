import { Ship } from "./Ship";
export class Gameboard {
	constructor(boardSize) {
		this.boardSize = boardSize;
		this.board = this.createBoard(boardSize);
		this.ships = [];
	}

	createBoard(boardSize) {
		let board = [];
		for (let i = 0; i < boardSize; i++) {
			let row = [];
			for (let j = 0; j < boardSize; j++) {
				row.push(null);
			}
			board.push(row);
		}
		return board;
	}

	addShip(ship) {
		if (this.isShipOverlap(ship) === true || this.isShipInBounds(ship) === false) {
			return false;
		}
		this.ships.push(ship);
		const row = ship.position.row;
		const col = ship.position.col;
		if (ship.orientation === "horizontal") {
			for (let i = 0; i < ship.shipLength; i++) {
				this.board[row][col + i] = ship;
			}
		} else {
			for (let i = 0; i < ship.shipLength; i++) {
				this.board[row + i][col] = ship;
			}
		}
		return true;
	}
	isShipInBounds(ship) {
		const leftOfShip = ship.position.col;
		const rightOfShip = leftOfShip + ship.shipLength - 1;
		if (leftOfShip < 0 || rightOfShip > this.boardSize - 1) {
			return false;
		}
		return true;
	}

	isShipOverlap(ship) {
		for (let i = 0; i < this.ships.length; i++) {
			let existingShip = this.ships[i];
			if (ship.position.orientation === "horizontal") {
				if (
					ship.position.row === existingShip.position.row &&
					ship.position.col + i >= existingShip.position.col &&
					ship.position.col + i <= existingShip.position.col + existingShip.shipLength - 1
				) {
					return true;
				}
			} else {
				if (
					ship.position.col === existingShip.position.col &&
					ship.position.row + i >= existingShip.position.row &&
					ship.position.row + i <= existingShip.position.row + existingShip.shipLength - 1
				) {
					return true;
				}
			}
		}
		return false;
	}

	receiveAttack(row, col) {
		if (this.board[row][col] === null) {
			return false;
		} else {
			const ship = this.board[row][col];
			if (ship.orientation === "horizontal") {
				ship.hitShip(col - ship.position.col);
			} else {
				ship.hitShip(row - ship.position.row);
			}
			return true;
		}
	}

	allShipsSunk() {
		return this.ships.every((ship) => ship.isSunk());
	}
}
