import { Ship } from "./Ship";

export default function placePlayerShips() {
	const rotateButton = document.createElement("button");
	rotateButton.textContent = "Rotate";
	const body = document.querySelector("body").appendChild(rotateButton);

	const squares = document.querySelectorAll(".square.humanSquare");

	squares.forEach((square) => {
		square.addEventListener("mouseover", () => {
			square.style.backgroundColor = "green";
		});

		square.addEventListener("mouseout", () => {
			square.style.backgroundColor = "#3a3a3a";
		});

		square.addEventListener("click", (event) => {
			const row = event.target.getAttribute("data-row");
			const column = event.target.getAttribute("data-col");
			console.log(row, column);
		});
	});
}
