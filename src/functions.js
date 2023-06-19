import { addKnight } from "./gameboard";

console.log(addKnight())

// method to decide next moves:

// coordinates are known (3,3)
// from each coordinate the possible moves are:
// [column-2, row+1] // (1,4)
// [column-1, row+2] // (2,5)
// [column+1, row+2] // (4,5)
// [column+2, row+1] // (5,4)
// [column+2, row-1] // (5,2)
// [column+1, row-2] // (4,1)
// [column-1, row-2] // (2,1)
// [column-2, row-1] // (1,2)

// the knight should not move away from board but we'll start with a center node
function possibleMoves(knightposition) {
  const startCoord = knightposition
  console.log("start pos: ", startCoord)
  const array = []
  array.push([startCoord[0]-2, startCoord[1]+1])
  array.push([startCoord[0]-1, startCoord[1]+2])
  array.push([startCoord[0]+1, startCoord[1]+2])
  array.push([startCoord[0]+2, startCoord[1]+1])
  array.push([startCoord[0]+2, startCoord[1]-1])
  array.push([startCoord[0]+1, startCoord[1]-2])
  array.push([startCoord[0]-1, startCoord[1]-2])
  array.push([startCoord[0]-2, startCoord[1]-1])

  console.log(array)
}

possibleMoves(addKnight())