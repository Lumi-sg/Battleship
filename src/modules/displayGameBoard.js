export function displayGameBoard(player) {
	console.log(player.gameboard.boardSize);
	for (let i = 0; i < player.gameboard.boardSize; i++) {
		const row = document.createElement("div");
		row.className = "row";
		for (let j = 0; j < player.gameboard.boardSize; j++) {
			const square = document.createElement("div");
			square.className = "square";
			row.appendChild(square);
		}
		if (player.name === "Human") {
			const playerBoard = document.querySelector(".gameboard.playerBoard");
			playerBoard.appendChild(row);
		} else if (player.name === "CPU") {
			const cpuBoard = document.querySelector(".gameboard.cpuBoard");
			cpuBoard.appendChild(row);
		}
	}
}
