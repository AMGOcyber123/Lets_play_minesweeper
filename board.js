// Possible state of any tile in the game 
// flag var 
export const tile_status = {
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

// Marking the tiles
export function markTile(tile)
{ 
  if(tile.status !== tile_status.HIDDEN && tile.status !== tile_status.MARKED)
  return;
  if(tile.status === tile_status.MARKED)
  {
    tile.status = tile_status.HIDDEN;
  }
  else
  {
    tile.status = tile_status.MARKED;
  }
}


// Revealing Tiles
export function RevealTile(board , tile)
{
  //console.log(tile)
  if(tile.status !== tile_status.HIDDEN)
  {
    return
  }

  if(tile.mine)
  {
    tile.status = tile_status.MINE;
    return;
  }
  tile.status = tile_status.NUMBER;
  const adj = surroundingTiles(board,tile); // get the state of all the near by elements
  const mineAt = adj.filter(t => t.mine)
  if(mineAt.length === 0)
  {
    adj.forEach(RevealTile.bind(null,board));
  }
  else 
  {
    tile.element.textContent = mineAt.length
  }
}

// recursive solution  

// randomly generate values to set mines
function getMinePos(boardSize, numberOfMines) 
{
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
  
// setting the mines 
function MatchPos(a, b) 
{
  return a.x === b.x && a.y === b.y
}

function rand(size) 
{
  return Math.floor(Math.random() * size)
}

// Opening the nearby tiles 
function surroundingTiles(board,{x,y})
{
  const tiles = []
  let Xoffset = -1;
  let Yoffset = -1;
  for(; Xoffset <=1 ; Xoffset++)
  {
    for(; Yoffset <= 1; Yoffset++)
    {
      const T = board[x+ Xoffset]?.[y + Yoffset];
      if(T) tiles.push(T);
    }
  }
  return tiles;
}