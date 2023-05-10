export class Ship {
	constructor(shipLength, position, orientation) {
		this.shipLength = shipLength;
		this.position = position;
		this.hits = Array(shipLength).fill(false);
		this.orientation = orientation;
	}

	isSunk() {
		if (this.hits.every((hit) => hit)) {
			return true;
		} else {
			return false;
		}
	}

	hitShip(index) {
		this.hits[index] = true;
	}

	rotate() {
		if (this.orientation === "horizontal") {
			this.orientation = "vertical";
		} else {
			this.orientation = "horizontal";
		}
	}
}
