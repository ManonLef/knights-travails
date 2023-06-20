/* eslint-disable no-use-before-define */
export default class Knight {
  constructor(pos = "default") {
    this.coord = addKnight(pos);
  }
}

function addKnight(position) {
  let pos = position
  const squares = document.querySelector(".container").children;
  if (pos === "default") {
    pos = [3, 3];
    squares[35].textContent = "♘";
  } else if (pos === "random") {
    const randomSquare = Math.floor(Math.random() * 64);
    squares[randomSquare].textContent = "♘";
    const data = squares[randomSquare].getAttribute("data-c");
    pos = [parseFloat(data[0]), parseFloat(data[2])];
  } else {
    // if passing coordinates
    document.querySelector(`[data-c="${pos}"]`).textContent = "♘";
  }
  return pos;
}