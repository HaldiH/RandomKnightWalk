export class ChessBoard {
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
            updateCallback(this.knight, i)

            if (this.knight.x == this.startKnight.x && this.knight.y == this.startKnight.y) {
                return i
            }
        }
    }
}
