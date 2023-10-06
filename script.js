// Import necessary functions and constants from minesweeper.js
import {
    TILE_STATUSES,
    createBoard,
    markTile,
    revealTile,
    checkWin,
    checkLose,
  } from "./minesweeper.js";
  
  // Define the size of the game board and the number of mines
  const BOARD_SIZE = 10;
  const NUMBER_OF_MINES = 3;
  
  // Create the game board
  const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
  
  // Get references to DOM elements
  const boardElement = document.querySelector(".board");
  const minesLeftText = document.querySelector("[data-mine-count]");
  const messageText = document.querySelector(".subtext");
  
  // Add event listeners and build the game board
  board.forEach(row => {
    row.forEach(tile => {
      // Append the tile element to the game board
      boardElement.append(tile.element);
  
      // Add click event listener to reveal a tile
      tile.element.addEventListener("click", () => {
        revealTile(board, tile);
        checkGameEnd();
      });
  
      // Add context menu event listener to mark a tile
      tile.element.addEventListener("contextmenu", e => {
        e.preventDefault();
        markTile(tile);
        listMinesLeft();
      });
    });
  });
  
  // Set the size of the game board using CSS custom properties
  boardElement.style.setProperty("--size", BOARD_SIZE);
  
  // Initialize the mines left count in the UI
  minesLeftText.textContent = NUMBER_OF_MINES;
  
  // Function to update the mines left count in the UI
  function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
      return (
        count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
      );
    }, 0);
  
    minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
  }
  
  // Function to check the game end condition (win or lose)
  function checkGameEnd() {
    const win = checkWin(board);
    const lose = checkLose(board);
  
    // Disable further interactions with the board when the game ends
    if (win || lose) {
      boardElement.addEventListener("click", stopProp, { capture: true });
      boardElement.addEventListener("contextmenu", stopProp, { capture: true });
    }
  
    // Display a message based on the game outcome
    if (win) {
      messageText.textContent = "You Win";
    }
    if (lose) {
      messageText.textContent = "You Lose";
  
      // Reveal all marked tiles and mines on a loss
      board.forEach(row => {
        row.forEach(tile => {
          if (tile.status === TILE_STATUSES.MARKED) markTile(tile);
          if (tile.mine) revealTile(board, tile);
        });
      });
    }
  }
  
  // Function to stop event propagation
  function stopProp(e) {
    e.stopImmediatePropagation();
  }
  