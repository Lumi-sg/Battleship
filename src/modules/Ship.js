export class Ship {
	constructor(shipLength, position) {
		this.shipLength = shipLength;
		this.position = position;
		this.hits = Array(shipLength).fill(false);
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
}
