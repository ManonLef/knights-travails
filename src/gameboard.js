function createWhiteSquare(column, row) {
  const whiteSquare = document.createElement("div");
  whiteSquare.className = "white";
  whiteSquare.setAttribute("data-coord", [column, row]);
  whiteSquare.textContent = ([column, row]);
  // whiteSquare.addEventListener("click", () => console.log([column, row]))
  return whiteSquare;
}

function createBlackSquare(column, row) {
  const blackSquare = document.createElement("div");
  blackSquare.className = "black";
  blackSquare.setAttribute("data-coord", [column, row]);
  blackSquare.textContent = ([column, row]);
  return blackSquare;
}

function createBoard(oddEven = "even", row = 7) {
  if (row < 0) return;
  let column = 0;

  const container = document.querySelector(".container");

  if (oddEven === "even") {
    while (column < 8) {
      container.append(createWhiteSquare(column, row));
      column += 1;
      container.append(createBlackSquare(column, row));
      column += 1;
    }
    createBoard("odd", row - 1);
  }
  if (oddEven === "odd") {
    while (column < 8) {
      container.append(createBlackSquare(column, row));
      column += 1;
      container.append(createWhiteSquare(column, row));
      column += 1;
    }
    createBoard("even", row - 1);
  }
}

function addKnight() {
  const squares = document.querySelector(".container").children;
  squares[35].textContent = "♘";

  const attribute = squares[35].getAttribute("data-coord");
  const knightPosition = [parseFloat(attribute[0]), parseFloat(attribute[2])];
  console.log("Knight's coordinates: ", knightPosition);
  // random knight position
  // const randomSquare = Math.floor(Math.random() * 64);
  // squares[randomSquare].textContent = "♘"
  return knightPosition;
}

function createBoardArray() {
  const squares = document.querySelector(".container").childNodes;
  const gameArray = [];
  squares.forEach((node) => {
    const data = node.getAttribute("data-coord");
    const coord = [parseFloat(data[0]), parseFloat(data[2])];
    gameArray.push(coord);
  });
  return gameArray;
}

createBoard();
addKnight();
createBoardArray();

export { addKnight, createBoardArray };
