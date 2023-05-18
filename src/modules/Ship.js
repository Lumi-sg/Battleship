export class Ship {
	constructor(shipLength, position, orientation) {
		this.shipLength = shipLength;
		this.position = {
			row: position.row,
			col: position.col,
		};
		this.hits = Array(shipLength).fill(false);
		this.orientation = orientation;
	}

	isSunk() {
		if (this.hits.every((hit) => hit)) {
			delete this;
			return true;
		} else {
			return false;
		}
	}

	hitShip(index) {
		this.hits[index] = true;
	}

	isHit(index) {
		if (this.hits[index]) {
			return true;
		}
		return false;
	}
}
