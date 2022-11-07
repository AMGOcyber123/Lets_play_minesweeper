// HTML file has to run on a server so as to avoid CORS error
import {tile_status, SetBoard, markTile, RevealTile} from "./board.js"

//console.log(SetBoard(2,2));
let BOARD_SIZE = 10;
let NO_MINES = 10;
const board = SetBoard(BOARD_SIZE,NO_MINES);
const boardElement = document.querySelector(".board")
const mineLeftText =  document.querySelector("[data-mine-count]"); 
const subtext = document.querySelector(".subtext");
//console.log(board)

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener('click',()=>{
            RevealTile(board,tile);
        })
        tile.element.addEventListener('contextmenu',e =>{
            e.preventDefault();
            markTile(tile);
            MinesLeft();
        })
    });
});

boardElement.style.setProperty("--size",BOARD_SIZE)
mineLeftText.textContent = NO_MINES;

function MinesLeft()
{
    const markTileCount = board.reduce((count,row)=>{
        return count+ row.filter(tile => tile.status == tile_status.MARKED).length
    },0);

    mineLeftText.textContent = NO_MINES - markTileCount
}