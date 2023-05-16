export class Ship {
	constructor(shipLength, position, orientation) {
		this.shipLength = shipLength;
		this.position = position;
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

	rotate() {
		if (this.orientation === "horizontal") {
			this.orientation = "vertical";
		} else {
			this.orientation = "horizontal";
		}
	}
}
