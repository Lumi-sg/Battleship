import { Ship } from "./Ship";
import { endTheGame } from "./endTheGame";

export default function boardEventGameLoop(player, computer) {
	const cpuSquares = document.querySelectorAll(".cpuSquare");
	cpuSquares.forEach((square) => {
		const clickHandler = () => {
			const row = square.dataset.row;
			const column = square.dataset.col;
			if (player.turn) {
				if (square.textContent !== "⚬" && square.textContent !== "🛥") {
					square.textContent = "⚬";
					if (computer.gameboard.board[row][column] instanceof Ship) {
						console.log("ship hit");
						square.textContent = "🛥";
						square.classList.add("ship");
					}
					computer.receiveAttack(row, column);

					computer.shipCounter();
					if (computer.hasLost()) {
						endTheGame("Player", player, computer);
						return;
					}
					player.changeTurn();
					player.attackRandomSpot();
					player.shipCounter();
					if (player.hasLost()) {
						endTheGame("CPU", player, computer);
						return;
					}
					player.changeTurn();
				}
			}
		};

		const mouseOverHandler = () => {
			if (
				square.textContent === "🛥" ||
				square.classList.contains("ship") ||
				square.textContent === "⚬"
			) {
				return;
			}
			square.classList.add("cpuHighlight");
		};

		const mouseOutHandler = () => {
			square.classList.remove("cpuHighlight");
		};

		square.addEventListener("click", clickHandler);
		square.addEventListener("mouseover", mouseOverHandler);
		square.addEventListener("mouseout", mouseOutHandler);
	});
}
