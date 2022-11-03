// HTML file has to run on a server so as to avoid CORS error
import { SetBoard } from "./board.js"

//console.log(SetBoard(2,2));
const BOARD_SIZE = 4;
const NO_MINES = 2;

const board = SetBoard(BOARD_SIZE,NO_MINES);
const boardElement = document.querySelector(".board")
console.log(board)
boardElement.style.setProperty("--size",BOARD_SIZE)
board.forEach(row => {
    row.forEach(tile => {
         boardElement.append(tile.elements)
    });
});