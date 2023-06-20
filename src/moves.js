import {
  arrayIncludes,
  removeFromBoard,
  getBoard,
  getKnightPosition,
} from "./functions";
import { logArray, clog } from "./debug";

const start = getKnightPosition();
const end = [4, 5];

const indexStart = arrayIncludes(start, getBoard());
removeFromBoard(indexStart)
console.log("the board with the starting position removed. Has length", getBoard().length)
logArray(getBoard())

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

function getNextMoves(coord) {
  const possibleMoves = [];
  for (let i = 0; i < moves.length; i++) {
    const col = coord[0] + moves[i][0];
    const row = coord[1] + moves[i][1];
    if (col >= 0 && row >= 0 && col <= 7 && row <= 7) {
      const move = [col, row];
      const visited = arrayIncludes(move, getBoard());
      if (visited >= 0) {
        // visited will be -1 (so true) if the array is already visited and removed
        // here we check for unvisited and push it and also removing from game array
        removeFromBoard(visited);
        possibleMoves.push(move);
        // consider moving the removal into another function
      }
    }
  }
  return possibleMoves;
}

/// ////////////////////////
//       testing area     //
/// ////////////////////////

clog(`we start at [${start}] and want to find the shortest route to [${end}]`);

function getNextLevel(array) {
  const nextLevel = [];
  const nextLevelSeparate = [];
  for (let i = 0; i < array.length; i++) {
    // only push when in game array
    const nextArray = getNextMoves(array[i], moves);
    nextLevel.push(nextArray);
    for (let j = 0; j < nextArray.length; j++) {
      nextLevelSeparate.push(nextArray[j]);
    }
  }
  return [nextLevel, nextLevelSeparate];
}

// when getting next moves:
// - get moves
//    - check if they're visited yet (still in game array)
//    - if not, push
//    - remove from game array
//    - if already visited, skip
const levelOne = getNextMoves(start);

console.log("level 1 with length ", levelOne.length, "leaves gameboard at ", getBoard().length);
logArray(levelOne);

const levelTwo = getNextLevel(levelOne);
const levelTwoNested = levelTwo[0];
const levelTwoSanitized = levelTwo[1];

console.log("level two");
logArray(levelTwoNested);
console.log("level two nested length is ", levelTwoNested.length);
levelTwoNested.forEach((element) => {
  console.log("level two elements");
  logArray(element);
});
console.log(
  "a sanitized level two version can be found here, handy for level three ;), with length",
  levelTwoSanitized.length, "leaves gameboard at ", getBoard().length
);
logArray(levelTwoSanitized);

const levelThree = getNextLevel(levelTwoSanitized);

console.log(
  "levelThree is where it gets tricky, it has length of ",
  levelThree[1].length,
  "if you don't count the empty children", "leaves gameboard at ", getBoard().length
);
logArray(levelThree);
console.log("unsanitized");
logArray(levelThree[0]);
console.log(
  "sanitized also removes empty elements which might make it harder to tie to parent"
);
logArray(levelThree[1]);

console.log("the board now looks like this:", getBoard().length);
logArray(getBoard());

// next steps would be tying these up as children to the starting nodes
// BFS needs a queue
// I'd first queue the initial item
// then calculate next steps from that
// check if the array that's output has the end position
// if not, pass each item in the queue as next step, with the passed item getting a reference to the child,
// and the child getting a reference back to the parent
// rinse and repeat
