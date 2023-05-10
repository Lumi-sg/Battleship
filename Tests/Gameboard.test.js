import { Gameboard } from "../src/modules/Gameboard";

describe("Gameboard Class Functionality", () => {
	test("should create a new gameboard object", () => {
		const gameboard = new Gameboard(10);
		expect(gameboard).toBeDefined();
		expect(gameboard.boardSize).toBe(10);
	});
});
