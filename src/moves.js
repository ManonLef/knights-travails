import {
  arrayIncludes,
  removeFromBoard,
  getBoard,
  getKnightPosition,
} from "./functions";
import { logArray, clog } from "./debug";

const start = getKnightPosition();
const end = [4, 5];

const moves = [
  [-1, -2],
  [-2, -1],
  [-1, +2],
  [-2, +1],
  [+1, +2],
  [+2, +1],
  [+1, -2],
  [+2, -1],
];

function getNextMoves(start, moves) {
  const possibleMoves = [];
  for (let i = 0; i < moves.length; i++) {
    const col = start[0] + moves[i][0];
    const row = start[1] + moves[i][1];
    if (col >= 0 && row >= 0 && col <= 7 && row <= 7) {
      possibleMoves.push([col, row]);
    }
  }
  return possibleMoves;
}

/// ////////////////////////
//       testing area     //
/// ////////////////////////

clog(`we start at [${start}] and want to find the shortest route to [${end}]`);

logArray(getNextMoves(start, moves));

function getNextLevel(array, moves) {
  const nextLevel = [];
  for (let i = 0; i < array.length; i++) {
    // only push when in game array
    const nextArray = getNextMoves(array[i], moves);
    // make sure
    nextLevel.push(nextArray);
    // for (let j = 0; j < nextArray.length; j++) {
    //   nextLevel.push(nextArray[j])
  }
  logArray(nextLevel);
  console.log(nextLevel.length); // handy because these correspond with the first array
}

getNextLevel(getNextMoves(start, moves), moves);
