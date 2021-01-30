import { ChessBoard } from './ChessBoard.mjs';

const board = new ChessBoard(8)
const tries = 1000000
let s = 0
for (let i = 0; i < tries; i++) {
    s += board.knightRandomWalk((knight, i) => { })
}
console.log(s / tries)