import { Ship } from "./Ship";
import boardEventGameLoop from "./boardEventGameLoop";

export default function placePlayerShips(player, board, container, cpu) {
	const playerShipDiv = document.querySelector(".playerShips");
	playerShipDiv.textContent = "Place your ships!";

	let orientation = "horizontal";
	const rotateButton = document.createElement("button");
	rotateButton.textContent = "↻";
	rotateButton.classList.add("rotateButton");
	// const rotateButtonDiv = document.querySelector(".rotateButton").appendChild(rotateButton);
	playerShipDiv.appendChild(rotateButton);

	const body = document.querySelector("body");
	body.addEventListener("wheel", handleWheel);

	rotateButton.addEventListener("click", () => {
		changeOrientation();
	});

	const shipSizes = [2, 2, 3, 3, 4, 5];
	let currentShipIndex = 0;

	setupEventListeners();

	function setupEventListeners() {
		const squares = document.querySelectorAll(".square.humanSquare");

		squares.forEach((square) => {
			square.addEventListener("mouseover", handleMouseOver);
			square.addEventListener("mouseout", handleMouseOut);
			square.addEventListener("click", handleClick);
		});
	}
	function handleMouseOver() {
		const row = parseInt(this.getAttribute("data-row"));
		const col = parseInt(this.getAttribute("data-col"));
		const shipSize = shipSizes[currentShipIndex];

		if (orientation === "horizontal") {
			for (let i = 0; i < shipSize; i++) {
				const nextCol = col + i;
				const nextSquare = document.querySelector(
					`.square.humanSquare[data-row="${row}"][data-col="${nextCol}"]`
				);

				if (nextSquare && !nextSquare.classList.contains("ship")) {
					nextSquare.style.backgroundColor = "green";
				}
			}
		} else if (orientation === "vertical") {
			for (let i = 0; i < shipSize; i++) {
				const nextRow = row + i;
				const nextSquare = document.querySelector(
					`.square.humanSquare[data-row="${nextRow}"][data-col="${col}"]`
				);

				if (nextSquare && !nextSquare.classList.contains("ship")) {
					nextSquare.style.backgroundColor = "green";
				}
			}
		}
	}
	function changeOrientation() {
		if (orientation === "horizontal") {
			orientation = "vertical";
		} else {
			orientation = "horizontal";
		}
	}

	function handleMouseOut() {
		const row = parseInt(this.getAttribute("data-row"));
		const col = parseInt(this.getAttribute("data-col"));
		const shipSize = shipSizes[currentShipIndex];

		if (orientation === "horizontal") {
			for (let i = 0; i < shipSize; i++) {
				const nextCol = col + i;
				const nextSquare = document.querySelector(
					`.square.humanSquare[data-row="${row}"][data-col="${nextCol}"]`
				);

				if (nextSquare && !nextSquare.classList.contains("ship")) {
					nextSquare.style.backgroundColor = "#3a3a3a";
				}
			}
		} else if (orientation === "vertical") {
			for (let i = 0; i < shipSize; i++) {
				const nextRow = row + i;
				const nextSquare = document.querySelector(
					`.square.humanSquare[data-row="${nextRow}"][data-col="${col}"]`
				);

				if (nextSquare && !nextSquare.classList.contains("ship")) {
					nextSquare.style.backgroundColor = "#3a3a3a";
				}
			}
		}
	}

	function handleClick(event) {
		const row = event.target.getAttribute("data-row");
		const column = event.target.getAttribute("data-col");
		clickToPlaceShip(row, column, orientation);
	}

	function handleWheel(event) {
		event.preventDefault();
		const squares = document.querySelectorAll(".square.humanSquare");
		squares.forEach((square) => {
			if (!square.classList.contains("ship")) {
				square.style.backgroundColor = "#3a3a3a";
			}
		});

		changeOrientation();

		const hoveredSquares = document.querySelectorAll(".square.humanSquare:hover");
		hoveredSquares.forEach((square) => {
			if (!square.classList.contains("ship")) {
				handleMouseOver.call(square); //
			}
		});
	}

	function clickToPlaceShip(row, column, orientation) {
		const shipSize = shipSizes[currentShipIndex];
		const position = { row: parseInt(row), col: parseInt(column) };

		const shipAdded = player.gameboard.addShip(shipSize, position, orientation);

		if (shipAdded) {
			console.log(`Ship with size ${shipSize} added successfully!`);
			player.gameboard.renderPlayerBoard(container, board);

			currentShipIndex++;
			if (currentShipIndex === shipSizes.length) {
				//start the game loop
				// playerShipDiv.remove(rotateButton);
				player.shipCounter();
				console.table(player.gameboard.ships);
				boardEventGameLoop(player, cpu);
				console.log("start game");
			} else {
				// Place the next ship
				console.log(`Place the next ship with size ${shipSizes[currentShipIndex]}`);

				setupEventListeners(); // reattach event listeners for the next ship
			}
		} else {
			console.log(
				`Unable to add ship with size ${shipSize}. Please select another position.`
			);
		}
	}
}
