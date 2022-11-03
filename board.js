// Possible state of any tile in the game 

const tile_status = {
    mine : "mine",
    hidden : "hidden",
    number : "number",
    marked : "marked"
}

// Setting up board 

function SetBoard(TotalRows,noOfMines) 
{
    const board = []
    
    const minePostion = MinePos(TotalRows,noOfMines)
    console.log(minePostion)
    for(let i = 0 ; i < TotalRows; i++)
    {
        const row = []
        for(let j = 0; j < TotalRows; j++)
        {
            const elements = document.createElement("div");
            elements.dataset.status = tile_status.hidden;
            const title = {
                elements,
                i,
                j,
                mine : minePostion.some(MatchPos.bind(null,{i,j})),
                get status()
                {
                    return this.elements.dataset.status
                },
                set status(value)
                {
                    this.elements.dataset.status = value
                }
            }
            row.push(title);
        }
        board.push(row);
    }
    return board
}

//setting position of mine in the board 
// Mines placed in unique places only 
function MinePos(TotalRows,noOfMines)
{
    const positions = []
    while(positions.length < noOfMines)
    {
        const pos = {
            x : rand(TotalRows),
            y : rand(TotalRows)
        }
        if(!positions.some(MatchPos.bind(null,pos)))
        {
            positions.push(pos);
        }
    }
    return positions;
}

// Checking if a mine was already present or not

function MatchPos(a,b)
{
    return a.x == b.x && a.y == b.y
}

// Randomly setting a mine in the board 

function rand(nums)
{
    return Math.floor(Math.random()*nums)
}

export {SetBoard}