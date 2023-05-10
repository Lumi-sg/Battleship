import { Gameboard } from "../modules/Gameboard";
import { Ship } from "../modules/Ship";

describe("Gameboard Class Functionality", () => {
	let gameboard;

	beforeEach(() => {
		gameboard = new Gameboard(10);
	});

	test("should create a new gameboard object", () => {
		expect(gameboard).toBeDefined();
		expect(gameboard.boardSize).toBe(10);
	});

	test("should create the correct size board", () => {
		const board = gameboard.createBoard(10);
		expect(board.length).toBe(10);
		board.forEach((row) => {
			expect(row.length).toBe(10);
		});
	});

	test("should validate and add a ship to the gameboard", () => {
		const shipOne = new Ship(3, { row: 1, col: 1 }, "horizontal");
		const result = gameboard.addShip(shipOne);
		expect(result).toBe(true);
		expect(gameboard.ships.length).toBe(1);
		expect(gameboard.board[1][1]).toBe(shipOne);
		expect(gameboard.board[1][2]).toBe(shipOne);
		expect(gameboard.board[1][3]).toBe(shipOne);
		const shipTwo = new Ship(3, { row: 1, col: 1 }, "horizontal");
		const resultTwo = gameboard.addShip(shipTwo);
		expect(resultTwo).toBe(false);
		const shipThree = new Ship(15, { row: 2, col: 2 }, "horizontal");
		const resultThree = gameboard.addShip(shipThree);
		expect(resultThree).toBe(false);
		const shipFour = new Ship(3, { row: 7, col: 7 }, "vertical");
		const resultFour = gameboard.addShip(shipFour);
		expect(resultFour).toBe(true);
	});

	test("should receive attack coordinates and eval correctly", () => {
		expect(gameboard.receiveAttack(1, 1)).toBe(false);
		const shipOne = new Ship(3, { row: 1, col: 1 }, "horizontal");
		gameboard.addShip(shipOne);
		expect(gameboard.receiveAttack(1, 1)).toBe(true);
		expect(gameboard.receiveAttack(1, 2)).toBe(true);
		expect(gameboard.receiveAttack(1, 4)).toBe(false);
		expect(gameboard.receiveAttack(2, 1)).toBe(false);
		expect(gameboard.receiveAttack(1, 3)).toBe(true);
	});

	test("should evaluate if all ships have been sunk", () => {
		const shipOne = new Ship(2, { row: 1, col: 1 }, "horizontal");
		const shipTwo = new Ship(2, { row: 4, col: 1 }, "horizontal");
		const shipThree = new Ship(2, { row: 8, col: 8 }, "vertical");

		gameboard.addShip(shipOne);
		gameboard.addShip(shipTwo);
		gameboard.addShip(shipThree);

		gameboard.receiveAttack(1, 1);
		gameboard.receiveAttack(1, 2);
		gameboard.receiveAttack(4, 1);
		gameboard.receiveAttack(4, 2);
		gameboard.receiveAttack(8, 8);
		gameboard.receiveAttack(9, 8);

		expect(shipOne.isSunk()).toBe(true);
		expect(shipTwo.isSunk()).toBe(true);
		expect(shipThree.isSunk()).toBe(true);

		expect(gameboard.allShipsSunk()).toBe(true);
	});
});
