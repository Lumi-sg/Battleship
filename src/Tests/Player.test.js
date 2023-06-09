import { Gameboard } from "../modules/Gameboard";
import { Ship } from "../modules/Ship";
import { Player } from "../modules/Player";

describe("Player Class Functionality", () => {
	let player;
	let gameboard;
	let ship;

	beforeEach(() => {
		gameboard = new Gameboard(10);
		player = new Player("Player 1", gameboard);
		ship = new Ship(3, { row: 0, col: 0 }, "horizontal");
	});

	describe("placeShip", () => {
		test("should add a ship to the gameboard", () => {
			expect(player.placeShip(ship, { row: 0, col: 0 }, "horizontal")).toBe(true);
			expect(gameboard.ships.length).toBe(1);
		});

		test("should return false if ship placement is invalid", () => {
			// Out of bounds
			expect(player.placeShip(ship, { row: 0, col: 8 }, "horizontal")).toBe(false);
			expect(gameboard.ships.length).toBe(0);

			// Overlapping with existing ship
			player.placeShip(ship, { row: 0, col: 0 }, "horizontal");
			const overlappingShip = new Ship(2, { row: 0, col: 0 }, "vertical");
			expect(player.placeShip(overlappingShip, { row: 0, col: 0 }, "vertical")).toBe(false);
			expect(gameboard.ships.length).toBe(1);
		});
	});

	describe("receiveAttack", () => {
		test("should return false if attack misses", () => {
			expect(player.receiveAttack(0, 0)).toBe(false);
		});

		test("should return true if attack hits a ship", () => {
			player.placeShip(ship, { row: 0, col: 0 }, "horizontal");
			expect(player.receiveAttack(0, 0)).toBe(true);
		});
	});

	describe("hasLost", () => {
		test("should return false if player has ships that are not sunk", () => {
			player.placeShip(ship, { row: 0, col: 0 }, "horizontal");
			expect(player.hasLost()).toBe(false);
		});

		test("should return true if all player's ships are sunk", () => {
			player.placeShip(ship, { row: 0, col: 0 }, "horizontal");
			player.receiveAttack(0, 0);
			player.receiveAttack(0, 1);
			player.receiveAttack(0, 2);
			expect(player.hasLost()).toBe(true);
		});
	});

	describe("attackRandomSpot", () => {
		test("should return false if there are no available spots to attack", () => {
			// create a new gameboard with no available spots to attack
			const boardSize = 1;
			const gameboard = new Gameboard(boardSize);

			// create a new player with the above gameboard
			const player = new Player("Player 1", gameboard);
			player.receiveAttack(0, 0);
			player.attackRandomSpot();
			// call attackRandomSpot and expect it to return false
			expect(player.attackRandomSpot()).toBe(false);
		});

		test("should attack a random available spot on the gameboard", () => {
			// create a new gameboard with one available spot to attack
			const boardSize = 1;
			const gameboard = new Gameboard(boardSize);

			// create a new player with the above gameboard
			const player = new Player("Player 1", gameboard);

			// call attackRandomSpot and expect it to return true
			expect(player.attackRandomSpot()).toBe(true);
		});

		test("should randomly attack a location and update board and ships", () => {
			const boardSize = 2;
			const gameboard = new Gameboard(boardSize);
			const player = new Player("Player 1", gameboard);
			ship = new Ship(2, { row: 0, col: 0 }, "horizontal");
			player.placeShip(ship, { row: 0, col: 0 }, "horizontal");
			player.attackRandomSpot();
			player.attackRandomSpot();
			player.attackRandomSpot();
			//we attack three times so that at minimum the board AND the ship have been hit at lease once.
			console.log(player.gameboard);
			const isAnyIndexHit = player.gameboard.board.some((row) =>
				row.some((index) => index === true)
			);

			const anyShipHit = player.gameboard.ships.some((ship) =>
				ship.hits.some((hit) => hit === true)
			);
			expect(isAnyIndexHit).toBe(true);
			expect(anyShipHit).toBe(true);
		});
	});

	describe("Player Turn", () => {
		test("should check if it is current player's turn", () => {
			expect(player.isTurn()).toBe(false);
			player.turn = true;
			expect(player.isTurn()).toBe(true);
		});
		test("should change the player's turn from false to true", () => {
			expect(player.isTurn()).toBe(false);
			player.changeTurn();
			expect(player.isTurn()).toBe(true);
		});
		test("should change the player's turn from true to false", () => {
			player.turn = true;
			expect(player.isTurn()).toBe(true);
			player.changeTurn();
			expect(player.isTurn()).toBe(false);
		});
	});
});
