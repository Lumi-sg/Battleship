import initGame from "./initGame";
export function endTheGame(winner, player, computer) {
	const body = document.querySelector("body");
	body.classList.add("blur");
	const modal = document.createElement("div");
	modal.classList.add("modal");
	modal.innerHTML = `
      <div class="modal-content">
        <h2>${winner} has won!</h2>
        <button id="play-again-btn">Play Again?</button>
      </div>
    `;

	document.body.appendChild(modal);

	const playAgainBtn = document.getElementById("play-again-btn");
	playAgainBtn.addEventListener("click", () => {
		modal.remove();
		const squares = document.querySelectorAll(".square");
		const rows = document.querySelectorAll(".row");

		squares.forEach((square) => {
			square.textContent = "";
			square.classList.remove("ship");
			square.remove();
		});

		rows.forEach((row) => {
			row.remove();
		});
		player.gameboard.clearBoard();
		computer.gameboard.clearBoard();
		body.classList.remove("blur");
		initGame();
	});
}
