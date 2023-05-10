import { Ship } from "../modules/Ship.js";

describe("Ship Class Functionality", () => {
	test("should create a new ship object", () => {
		const ship = new Ship(3, [1, 2, 3], "vertical");
		expect(ship).toBeDefined();
		expect(ship.shipLength).toBe(3);
		expect(ship.position).toEqual([1, 2, 3]);
		expect(ship.hits).toEqual([false, false, false]);
		expect(ship.orientation).toEqual("vertical");
	});

	test("should check if the ship has been destroyed", () => {
		const ship = new Ship(3, [1, 2, 3], "horizontal");
		expect(ship.isSunk()).toBe(false);
		ship.hitShip(0);
		expect(ship.isSunk()).toBe(false);
		ship.hitShip(1);
		expect(ship.isSunk()).toBe(false);
		ship.hitShip(2);
		expect(ship.isSunk()).toBe(true);
	});

	test("should update the hit array when ship is hit", () => {
		const ship = new Ship(4, [1, 2, 3, 4]);
		expect(ship.hits).toEqual([false, false, false, false]);
		ship.hitShip(0);
		expect(ship.hits).toEqual([true, false, false, false]);
		ship.hitShip(3);
		expect(ship.hits).toEqual([true, false, false, true]);
	});

	test("should update the orientation of the ship", () => {
		const ship = new Ship(3, [1, 2, 3], "horizontal");
		expect(ship.orientation).toEqual("horizontal");
		ship.rotate();
		expect(ship.orientation).toEqual("vertical");
	});
});
