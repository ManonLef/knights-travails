function createWhiteSquare() {
  const whiteSquare = document.createElement("div");
  whiteSquare.className = "white";
  return whiteSquare;
}

function createBlackSquare() {
  const blackSquare = document.createElement("div");
  blackSquare.className = "black";
  return blackSquare;
}

function createBoard(row = "even", amount = 1) {
  if (amount > 8) return;
  let squares = 0;

  const container = document.querySelector(".container");

  if (row === "even") {
    while (squares < 8) {
      container.append(createWhiteSquare(), createBlackSquare());
      squares += 2;
    }
    createBoard("odd", amount + 1);
  }
  if (row === "odd") {
    while (squares < 8) {
      container.append(createBlackSquare(), createWhiteSquare());
      squares += 2;
    }
    createBoard("even", amount + 1);
  }
}

// function addKnight() {
//   // generate a random number up to 64
//   // target a random div with container child number
//   // add text content symbol of knight
//   const randomSquare = 

// }

createBoard();
