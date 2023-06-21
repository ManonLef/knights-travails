/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
export default class GameBoard {
  constructor() {
    this.board = this.createBoard();
    this.boardArray = createBoardArray();
  }

  createBoard(oddOrNot = "odd", row = 7) {
    if (row < 0) return;
    let column = 0;

    const container = document.querySelector(".container");

    if (oddOrNot === "even") {
      while (column < 8) {
        container.append(
          createSquare(column++, row, "white"),
          createSquare(column++, row, "black")
        );
      }
      this.createBoard("odd", row - 1);
    }
    if (oddOrNot === "odd") {
      while (column < 8) {
        container.append(
          createSquare(column++, row, "black"),
          createSquare(column++, row, "white")
        );
      }
      this.createBoard("even", row - 1);
    }
  }
}

function createBoardArray(gameArray = []) {
  const allSquaresArr = document.querySelector(".container").childNodes;
  allSquaresArr.forEach((square) => {
    const data = square.getAttribute("data-c");
    const coordToArray = [parseFloat(data[0]), parseFloat(data[2])];
    gameArray.push(coordToArray);
  });
  return gameArray;
}

function createSquare(column, row, color) {
  const square = document.createElement("div");
  square.className = color;
  square.setAttribute("data-c", [column, row]);
  return square;
}
