import {
  TILE_STATUS,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLoose,
} from './minessweeper.js'

const BOARD_SIZE = 10
const NUMBER_OF_SIZE = 10

const board = createBoard(BOARD_SIZE, NUMBER_OF_SIZE)
const boardElement = document.querySelector('.board')
const minsesLefttext = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.subtext')

boardElement.style.setProperty('--size', BOARD_SIZE)
console.log(board, 'boars')

function render() {
  checkGameEnd()
  boardElement.innerHTML = ''

  getTileElements().forEach((element) => {
    boardElement.append(element)
  })
  listMinesLeft()
}

function getTileElements() {
  return board.flatMap((row) => {
    return row.map(tileToElement)
  })
}

function tileToElement(tile) {
  const element = document.createElement('div')
  element.dataset.status = tile.status
  element.dataset.x = x
  element.dataset.y = y
  element.textContent = tile.adjacentMinesCount || ''
}

boardElement.addEventListener('click', (e) => {
  if (!e.target.matches('[data-status]')) return

  revealTile(
    board,
    board[parseInt(e.target.dataset.x)][parseInt(e.target.dataset.y)]
  )
  render()
})

boardElement.addEventListener('contextmenu', (e) => {
  if (!e.target.matches('[data-status]')) return
  e.preventDefault()
  markTile(
    board,
    board[parseInt(e.target.dataset.x)][parseInt(e.target.dataset.y)]
  )
  render()
})

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element)
    tile.element.addEventListener('click', () => {
      revealTile(board, tile)
    })
    tile.element.addEventListener('contextmenu', (e) => {
      markTile(board, tile)
    })
  })
})

minsesLefttext.innerText = NUMBER_OF_SIZE

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    console.log(count, 'count')
    return (
      count + row.filter((tile) => tile.status === TILE_STATUS.MARKED).length
    )
  }, 0)

  minsesLefttext.innerText = NUMBER_OF_SIZE - markedTilesCount
}

function checkGameEnd() {
  const win = checkWin(board)
  const loose = checkLoose(board)

  if (win || loose) {
    boardElement.addEventListener('click', stopProp, { capture: true })
    boardElement.addEventListener('contextmenu', stopProp, { capture: true })

    if (win) {
      messageText.textContent = 'You Win'
    }
    if (loose) {
      messageText.textContent = 'You Loose'
      board.forEach((row) => {
        row.forEach((tile) => {
          if (tile.status === TILE_STATUS.MARKED) markTile(tile)
          if (tile.mine) revealTile(board, tile)
        })
      })
    }
  }
}

function stopProp(e) {
  e.stopImmediatePropagation()
}
