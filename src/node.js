export default class Node {
  constructor(data) {
    this.data = data;
    this.one = this.possibleMoves(this.data, +1, +2);
    this.two = this.possibleMoves(this.data, +2, +1);
    this.three = this.possibleMoves(this.data, +2, -1);
    this.four = this.possibleMoves(this.data, +1, -2);
    this.five = this.possibleMoves(this.data, -1, -2);
    this.six = this.possibleMoves(this.data, -2, -1);
    this.seven = this.possibleMoves(this.data, -2, +1);
    this.eight = this.possibleMoves(this.data, -1, +2);
  }

  possibleMoves(node, column, row) {
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
    array.push(startCoord[0] + column, startCoord[1] + row);
    return array;
  }

  sortedArray() {
    const array = [this.one, this.two, this.three, this.four, this.five, this.six, this.seven, this.eight]
    const sorted = mergeSort(array)
    return sorted
  }
}

// testing 

const myNode = new Node([3, 3]);
console.log("my Node: ", myNode);
console.log("myNode.one", myNode.one);
console.log("myNode.two", myNode.two);
console.log("myNode.three", myNode.three);
console.log("myNode.four", myNode.four);
console.log("myNode.five", myNode.five);
console.log("myNode.six", myNode.six);
console.log("myNode.seven", myNode.seven);
console.log("myNode.eight", myNode.eight);

console.log("sorted node: ", myNode.sortedArray())


// helpers

function mergeSort(array) {
  if (array.length < 2) return array;

  const firstHalf = array.slice(0, array.length / 2);
  const secondHalf = array.slice(array.length / 2);

  const left = mergeSort(firstHalf);
  const right = mergeSort(secondHalf);

  const merged = [];

  while (left.length !== 0 && right.length !== 0) {
    if (left[0] < right[0]) {
      merged.push(left.shift());
    } else {
      merged.push(right.shift());
    }
  }
  while (left.length !== 0) {
    merged.push(left.shift());
  }
  while (right.length !== 0) {
    merged.push(right.shift());
  }

  return merged;
}
