// HTML file has to run on a server so as to avoid CORS error
import { SetBoard, markTile } from "./board.js"

//console.log(SetBoard(2,2));
let BOARD_SIZE = 10;
let NO_MINES = 10;
let counter = 10;
const board = SetBoard(BOARD_SIZE,NO_MINES);
const boardElement = document.querySelector(".board")
const mineLeftText =  document.querySelector("[data-mine-count]"); 
console.log(board)

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener('click',()=>{})
        tile.element.addEventListener('contextmenu',e =>{
            e.preventDefault();
            markTile(tile);
        })
    });
});

boardElement.style.setProperty("--size",BOARD_SIZE)
mineLeftText.textContent = NO_MINES