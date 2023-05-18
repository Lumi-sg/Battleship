import { Ship } from "./Ship";
import { endTheGame } from "./endTheGame";

export default function boardEventGameLoop(player, computer) {
	const cpuSquares = document.querySelectorAll(".cpuSquare");
	cpuSquares.forEach((square) => {
		const clickHandler = () => {
			const row = square.dataset.row;
			const column = square.dataset.col;
			if (player.turn) {
				if (square.textContent !== "X") {
					square.textContent = "X";
					if (computer.gameboard.board[row][column] instanceof Ship) {
						console.log("ship hit");
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

		square.addEventListener("click", clickHandler);
	});
}
