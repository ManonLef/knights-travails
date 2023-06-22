/* eslint-disable no-restricted-syntax */
import GameBoard from "./DOMgameBoard";
import Knight from "./DOMknight";

/// ///////////////////////
//  initial game render  //
/// ///////////////////////

const myBoard = new GameBoard();
const chessBoard = [...myBoard.boardArray];
const knight = new Knight("random");

/// ////////////////////////
// array helper functions //
/// ////////////////////////

// returns -1 if not found, otherwise returns index
function arrayIncludes(arr, compare) {
  let index = -1;
  for (const array of compare) {
    index += 1;
    if (array[0] === arr[0] && array[1] === arr[1]) {
      return index;
    }
  }
  return -1;
}

function removeFromBoard(index) {
  if (index) chessBoard.splice(index, 1)
}

function getBoard() {
  return chessBoard
}

function getKnightPosition() {
  return knight.coord
}

export { arrayIncludes, removeFromBoard, getBoard, getKnightPosition };
