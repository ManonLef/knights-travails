export default class GameBoard {
  constructor() {
    this.board = this.createBoard();
    this.boardArray = this.createBoardArray();
  }

  createBoard(oddOrNot = "odd", row = 7) {
    if (row < 0) return;
    let column = 0;

    const container = document.querySelector(".container");

    if (oddOrNot === "even") {
      while (column < 8) {
        container.append(
          this.createSquare(column++, row, "white"),
          this.createSquare(column++, row, "black")
        );
      }
      this.createBoard("odd", row - 1);
    }
    if (oddOrNot === "odd") {
      while (column < 8) {
        container.append(
          this.createSquare(column++, row, "black"),
          this.createSquare(column++, row, "white")
        );
      }
      this.createBoard("even", row - 1);
    }
  }

  createSquare(column, row, color) {
    const square = document.createElement("div");
    square.className = color;
    square.setAttribute("data-c", [column, row]);
    square.textContent = [column, row];
    return square;
  }

  createBoardArray(gameArray = []) {
    const allSquaresArr = document.querySelector(".container").childNodes;
    allSquaresArr.forEach((square) => {
      const data = square.getAttribute("data-c");
      const coordToArray = [parseFloat(data[0]), parseFloat(data[2])];
      gameArray.push(coordToArray);
    });
    return gameArray;
  }
}
