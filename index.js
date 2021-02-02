const ChessBoard = require('./ChessBoard')

const startKnight = {x: 0, y: 0}
const board = new ChessBoard(8, startKnight)
const tries = 1000000
let s = 0
for (let i = 0; i < tries; i++) {
    s += board.knightRandomWalk((knight, i) => { })
}
console.log(s / tries)