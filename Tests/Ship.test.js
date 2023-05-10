import { Ship } from "../src/modules/Ship.js";

describe("Ship Class Functionality", () => {
	test("should create a new ship object", () => {
		const ship = new Ship(3, [1, 2, 3]);
		expect(ship).toBeDefined();
		expect(ship.shipLength).toBe(3);
		expect(ship.position).toEqual([1, 2, 3]);
		expect(ship.hits).toEqual([false, false, false]);
	});

	test("should check if the ship has been destroyed", () => {
		const ship = new Ship(3, [1, 2, 3]);
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
});
