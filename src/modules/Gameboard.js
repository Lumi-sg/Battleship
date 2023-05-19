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

	renderCPUGameBoard(container, board) {
		for (let i = 0; i < board.length; i++) {
			const row = document.createElement("div");
			row.classList.add("row");
			for (let j = 0; j < board[i].length; j++) {
				const square = document.createElement("div");
				square.classList.add("square");
				if (container.classList.contains("playerBoard")) {
					square.classList.add("humanSquare");
					if (board[i][j] instanceof Ship) {
						square.textContent = "S";
						square.classList.add("ship");
					}
				} else if (container.classList.contains("cpuBoard")) {
					square.classList.add("cpuSquare");
					// if (board[i][j] instanceof Ship) {
					// 	square.textContent = "S";
					// 	square.classList.add("ship");
					// 	//REMOVE ABOVE WHEN DONE TESTING
					// }
				}

				square.setAttribute("data-row", i);
				square.setAttribute("data-col", j);
				row.appendChild(square);
			}
			container.appendChild(row);
		}
	}

	renderPlayerBoard(container, board) {
		container.innerHTML = "";
		for (let i = 0; i < board.length; i++) {
			const row = document.createElement("div");
			row.classList.add("row");
			for (let j = 0; j < board.length; j++) {
				const square = document.createElement("div");
				square.classList.add("square");
				square.classList.add("humanSquare");
				if (board[i][j] instanceof Ship) {
					square.textContent = "S";
					square.classList.add("ship");
				}
				square.setAttribute("data-row", i);
				square.setAttribute("data-col", j);
				row.appendChild(square);
			}
			container.appendChild(row);
		}
	}
	receiveAttack(row, col) {
		if (this.board[row][col] === null) {
			this.board[row][col] = true; // Mark the location as a miss
			return false;
		} else {
			const ship = this.board[row][col];
			if (ship.orientation === "horizontal") {
				ship.hitShip(col - ship.position.col);
			} else {
				ship.hitShip(row - ship.position.row);
			}
			this.board[row][col] = true; // Mark the location as a hit
			return true;
		}
	}

	allShipsSunk() {
		return this.ships.every((ship) => ship.isSunk());
	}

	numberOfShips() {
		const totalShipAmount = this.ships.length;
		const sunkenShips = this.ships.filter((ship) =>
			ship.hits.every((hit) => hit === true)
		).length;
		if (totalShipAmount - sunkenShips > 0) {
			return totalShipAmount - sunkenShips;
		}
		return 0;
	}
	clearBoard() {
		this.board = this.createBoard(this.boardSize);
		this.ships = [];
	}

	addShip(shipLength, position, orientation) {
		const newShip = new Ship(shipLength, position, orientation);
		if (this.isShipInBounds(newShip) && !this.isShipOverlap(newShip)) {
			this.ships.push(newShip);
			this.placeShipOnBoard(newShip);
			return true;
		}
		return false;
	}

	isShipInBounds(ship) {
		if (ship.orientation === "horizontal") {
			const endCol = ship.position.col + ship.shipLength - 1;
			return endCol < this.boardSize;
		} else if (ship.orientation === "vertical") {
			const endRow = ship.position.row + ship.shipLength - 1;
			return endRow < this.boardSize;
		}
		return false;
	}

	isShipOverlap(ship) {
		if (ship.orientation === "horizontal") {
			for (let col = ship.position.col; col < ship.position.col + ship.shipLength; col++) {
				if (this.board[ship.position.row][col] !== null) {
					return true;
				}
			}
		} else if (ship.orientation === "vertical") {
			for (let row = ship.position.row; row < ship.position.row + ship.shipLength; row++) {
				if (this.board[row][ship.position.col] !== null) {
					return true;
				}
			}
		}
		return false;
	}

	placeShipOnBoard(ship) {
		if (ship.orientation === "horizontal") {
			for (let col = ship.position.col; col < ship.position.col + ship.shipLength; col++) {
				this.board[ship.position.row][col] = ship;
			}
		} else if (ship.orientation === "vertical") {
			for (let row = ship.position.row; row < ship.position.row + ship.shipLength; row++) {
				this.board[row][ship.position.col] = ship;
			}
		}
	}
}
