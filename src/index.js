import css from "./styles.css";
import { Ship } from "./modules/Ship";
import { Gameboard } from "./modules/Gameboard";
import { Player } from "./modules/Player";
import { displayGameBoard } from "./modules/displayGameBoard";

let playerGameBoard = new Gameboard(10);
let playerOne = new Player("Human", playerGameBoard);

let cpuGameBoard = new Gameboard(10);
let cpuOne = new Player("CPU", cpuGameBoard);

displayGameBoard(playerOne);
displayGameBoard(cpuOne);
