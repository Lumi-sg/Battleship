import css from "./styles.css";
import { Ship } from "./modules/Ship";
import { Gameboard } from "./modules/Gameboard";
import { Player } from "./modules/Player";

let player;
let gameboard;
let ship;

gameboard = new Gameboard(2);
player = new Player("Player 1", gameboard);
console.table(player.gameboard.board);

ship = new Ship(2, { row: 0, col: 0 }, "horizontal");
player.placeShip(ship, { row: 0, col: 0 }, "horizontal");
console.table(player.gameboard.ships);
player.attackRandomSpot();
player.attackRandomSpot();
console.table(player.gameboard.ships);

