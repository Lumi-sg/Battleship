import { Ship } from "./Ship";

// export function displayGameBoard(player) {
// 	console.log(player.gameboard.boardSize);
// 	let boardIndex = 0;
// 	for (let i = 0; i < player.gameboard.boardSize; i++) {
// 		const row = document.createElement("div");
// 		row.className = "row";
// 		for (let j = 0; j < player.gameboard.boardSize; j++) {
// 			const square = document.createElement("div");
// 			square.className = "square";
// 			if (player.name === "CPU") {
// 				square.classList.add("CPU");
// 			}
// 			if (square.classList.contains("CPU")) {
// 				square.addEventListener("click", () => {
// 					square.classList.add("hit");
// 					square.textContent = "X";
// 				});
// 			}
// 			if (player.name === "Human") {
// 				if (player.gameboard.board[boardIndex] instanceof Ship) {
// 					square.textContent = "B";
// 				}
// 				boardIndex++;
// 			}
// 			row.appendChild(square);
// 		}
// 		if (player.name === "Human") {
// 			const playerBoard = document.querySelector(".gameboard.playerBoard");
// 			playerBoard.appendChild(row);
// 		} else if (player.name === "CPU") {
// 			const cpuBoard = document.querySelector(".gameboard.cpuBoard");
// 			cpuBoard.appendChild(row);
// 		}
// 	}
// }
