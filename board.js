// Possible state of any tile in the game 
// flag var 
const tile_status = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked",
  }
  
  // Setting up board 
  
  export function SetBoard(boardSize, numberOfMines) {
    const board = []
    const minePositions = getMinePos(boardSize, numberOfMines)
    console.log(minePositions)
  
    for (let x = 0; x < boardSize; x++) {
      const row = []
      for (let y = 0; y < boardSize; y++) {
        const element = document.createElement("div")
        element.dataset.status = tile_status.HIDDEN
  
        const tile = {
          element,
          x,
          y,
          mine: minePositions.some(MatchPos.bind(null, { x, y })),
          get status() {          // getter 
            return this.element.dataset.status
          },
          set status(value) {     // setter
            this.element.dataset.status = value
          },
        }
        row.push(tile)
      }
      board.push(row)
    }
    return board
  }
  
  export function markTile(tile)
  { 
    if(
      tile.status !== tile_status.HIDDEN && tile.status !== tile_status.MARKED)
    {
      return
    }
    if(tile.status === tile_status.MARKED)
    {
      tile.status = tile_status.HIDDEN;
    }
    else
    {
      tile.status = tile_status.MARKED;
    }
  }
  
  function getMinePos(boardSize, numberOfMines) {
    const positions = []
  
    while (positions.length < numberOfMines) {
      const position = {
        x: rand(boardSize),
        y: rand(boardSize),
      }
  
      if (!positions.some(MatchPos.bind(null, position))) {
        positions.push(position)
      }
    }
  
    return positions
  }
  
  function MatchPos(a, b) {
    return a.x === b.x && a.y === b.y
  }
  
  function rand(size) {
    return Math.floor(Math.random() * size)
  }