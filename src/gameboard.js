function createWhiteSquare(row, square) {
  const whiteSquare = document.createElement("div");
  whiteSquare.className = "white";
  whiteSquare.setAttribute("data-coord", [square, row]);
  return whiteSquare;
}

function createBlackSquare(row, square) {
  const blackSquare = document.createElement("div");
  blackSquare.className = "black";
  blackSquare.setAttribute("data-coord", [square, row]);

  return blackSquare;
}

function createBoard(row = "even", amount = 0) {
  if (amount > 7) return;
  let squares = 0;

  const container = document.querySelector(".container");

  if (row === "even") {
    while (squares < 8) {
      container.append(createWhiteSquare(amount, squares));
      squares += 1;
      container.append(createBlackSquare(amount, squares));
      squares += 1;
    }
    createBoard("odd", amount + 1);
  }
  if (row === "odd") {
    while (squares < 8) {
      container.append(createBlackSquare(amount, squares));
      squares += 1;
      container.append(createWhiteSquare(amount, squares));
      squares += 1;
    }
    createBoard("even", amount + 1);
  }
}

function addKnight() {
  const squares = document.querySelector(".container").children;
  squares[35].textContent = "♘";

  const attribute = squares[35].getAttribute("data-coord");
  console.log("Knight's coordinates: ", [
    parseFloat(attribute[0]),
    parseFloat(attribute[2]),
  ]);
  // random knight position
  // const randomSquare = Math.floor(Math.random() * 64);
  // squares[randomSquare].textContent = "♘"
}

function createBoardArray() {
  const squares = document.querySelector(".container").childNodes;
  const gameArray = [];
  squares.forEach((node) => {
    const data = node.getAttribute("data-coord")
    const coord = [parseFloat(data[0]), parseFloat(data[2])]
    gameArray.push(coord)
  })
  console.log(gameArray[7])
  return gameArray
}

createBoard();
addKnight();
createBoardArray()