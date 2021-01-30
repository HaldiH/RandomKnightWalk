class ChessBoard {
  constructor(size, knightPos = { x: 0, y: 0 }) {
    this.size = size
    this.startKnight = knightPos
    this.knight = this.startKnight
  }

  possibleKnightMoves = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 1, y: -2 },
    { x: 2, y: -1 },
    { x: -1, y: 2 },
    { x: -2, y: 1 },
    { x: -1, y: -2 },
    { x: -2, y: -1 }
  ]

  knightCoordinates() {
    let coordinates = []

    this.possibleKnightMoves.forEach((move) => {
      const coord = { x: this.knight.x + move.x, y: this.knight.y + move.y }
      if (0 <= coord.x && coord.x < this.size && 0 <= coord.y && coord.y < this.size)
        coordinates.push(coord)
    })

    return coordinates
  }

  knightRandomWalk(updateCallback) {
    for (let i = 1; true; i++) {
      const coordinates = this.knightCoordinates()
      this.knight = coordinates[Math.floor(Math.random() * coordinates.length)]
      updateCallback(this.knight)

      if (this.knight.x == this.startKnight.x && this.knight.y == this.startKnight.y) {
        return i
      }
    }
  }
}

const board = new ChessBoard(8);

let caseWidth;
let caseHeight;

function setup() {
  createCanvas(400, 400);
  caseWidth = Math.floor(width / board.size)
  caseHeight = Math.floor(height / board.size)
}

function draw() {
  background(200);

  for (let i = 1; i < board.size; i++) {
    line(0, i * caseHeight, width, i * caseHeight)
  }
  for (let j = 1; j < board.size; j++) {
    line(j * caseWidth, 0, j * caseWidth, height)
  }

  let valueArray = [{ node: board.startKnight, count: 1 }];
  let lastVisitedCase = board.startKnight;
  let maxCount = 1;

  board.knightRandomWalk((knight) => {
    line((lastVisitedCase.x + 1) * caseWidth - caseWidth / 2, (lastVisitedCase.y + 1) * caseHeight - caseHeight / 2,
      (knight.x + 1) * caseWidth - caseWidth / 2, (knight.y + 1) * caseHeight - caseHeight / 2)

    lastVisitedCase = knight
    const index = valueArray.findIndex(el => el.node.x == knight.x && el.node.y == knight.y)
    if (index < 0) {
      valueArray.push({ node: knight, count: 1 })
      return;
    }
    if (++valueArray[index].count > maxCount)
      maxCount = valueArray[index].count
  })

  valueArray.forEach((value) => {
    fill(value.count / maxCount * 255, 0, 0)
    circle(value.node.x * caseWidth + (caseWidth / 2), value.node.y * caseHeight + (caseHeight / 2),
      caseWidth < caseHeight ? caseWidth / 2 : caseHeight / 2)
  })
  noLoop()
}
