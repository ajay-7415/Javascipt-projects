export const TILE_STATUS = {
  HIDDEN: 'hidden',
  MINE: 'mine',
  NUMBER: 'number',
  MARKED: 'marked',
}

export function createBoard(boardSize, numberOfMines) {
  const board = []
  const minePositions = getMinePositions(boardSize, numberOfMines)
  console.log(minePositions, 'mine')
  for (let x = 0; x < boardSize; x++) {
    const row = []
    for (let y = 0; y < boardSize; y++) {
      const tile = {
        x,
        y,
        mine: minePositions.some(positionMatch.bind(null, { x, y })),
        status: TILE_STATUS.HIDDEN,
      }
      row.push(tile)
    }
    board.push(row)
  }
  return board
}

export function revealTile(board, tile) {
  if (tile.status !== TILE_STATUS.HIDDEN) {
    return
  }
  if (tile.mine) {
    tile.status = TILE_STATUS.MINE
    console.log('LOG')
    return
  }
  tile.status = TILE_STATUS.NUMBER
  const adjacentTile = nearByTiles(board, tile)
  const mines = adjacentTile.filter((t) => t.mine)
  if (mines.length === 0) {
    adjacentTile.forEach(revealTile.bind(null, board))
  } else {
    tile.element.textContent = mines.length
  }
}

export function checkWin(board) {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        tile.status === TILE_STATUS.NUMBER ||
        (tile.mine && (tile.status === TILE_STATUS.HIDDEN || tile.status))
      )
    })
  })
}
export function checkLoose(board) {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === TILE_STATUS.MINE
    })
  })
}

export function markTile(board, tile) {
  if (
    tile.status !== TILE_STATUS.HIDDEN &&
    tile.status !== TILE_STATUS.MARKED
  ) {
    return
  }
  if (tile.status === TILE_STATUS.MARKED) {
    tile.status = TILE_STATUS.HIDDEN
  }
  tile.status = TILE_STATUS.MARKED
}

function getMinePositions(boardSize, numberOfMines) {
  const positions = []

  while (positions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    }
    if (!positions.some((p) => positionMatch(p, position))) {
      positions.push(position)
    }
  }

  return positions
}

function positionMatch(a, b) {
  return a.x === a.y && a.y === b.y
}

function randomNumber(size) {
  return Math.floor(Math.random() * size)
}

function nearByTiles(board, { x, y }) {
  const tiles = []

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset]
      if (tile) tiles.push(tile)
    }
  }

  return tiles
}
