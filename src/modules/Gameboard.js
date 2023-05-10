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

    addShip(ship){
        
    }
}
