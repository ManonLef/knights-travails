export default class Node {
  constructor(data) {
    this.data = data;
    this.one = this.possibleMoves(this.data, +2, +1);
    this.two = this.possibleMoves(this.data, +1, +2);
    this.three = this.possibleMoves(this.data, -1, +2);
    this.four = this.possibleMoves(this.data, -2, +1);
    this.five = this.possibleMoves(this.data, -2, -1);
    this.six = this.possibleMoves(this.data, -1, -2);
    this.seven = this.possibleMoves(this.data, +1, -2);
    this.eight = this.possibleMoves(this.data, +2, -1);
  }

  possibleMoves(node, row, column) {
    const startCoord = node;
    const array = [];
    if (
      startCoord[0] + row < 0 ||
      startCoord[0] + row > 7 ||
      startCoord[1] + column < 0 ||
      startCoord[1] + column > 7
    )
      return null;

    // else
    array.push(startCoord[0] + row, startCoord[1] + column);
    return array;
  }
}

const myNode = new Node([3, 3]);
console.log("my Node: ", myNode);
console.log(myNode.three);
