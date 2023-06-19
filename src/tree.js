import Node from "./node";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
    this.moves = this.convertToNodes(this.sortedArray());
  }

  // Method to create all possible next possible positions from a node
  buildTree(array) {
    if (array.length === 0) return null;
    let root = new Node(array);
    return root;
  }

  // 
  moves() {
    const movesArray = this.root.moves;
    const cleanArray = [];
    movesArray.forEach((element) => {
      if (element === null) return;
      else cleanArray.push(element);
    });
    return cleanArray;
  }

  // converts child array to Nodes
  convertToNodes(array) {
    for (let i = 0; i < array.length; i++){
     console.log(array[i])
     array[i] = new Node(array[i])
    }
    return array
  }
  
  possibleMoves(node, column, row) {
    const startCoord = node.data;
    const array = [];
    if (
      startCoord[0] + column < 0 ||
      startCoord[0] + column > 7 ||
      startCoord[1] + row < 0 ||
      startCoord[1] + row > 7
    )
      return null;

    // else
    array.push(startCoord[0] + column, startCoord[1] + row);
    return array;
  }

  sortedArray() {
    const array = [
      this.possibleMoves(this.root, +1, +2),
      this.possibleMoves(this.root, +2, +1),
      this.possibleMoves(this.root, +2, -1),
      this.possibleMoves(this.root, +1, -2),
      this.possibleMoves(this.root, -1, -2),
      this.possibleMoves(this.root, -2, -1),
      this.possibleMoves(this.root, -2, +1),
      this.possibleMoves(this.root, -1, +2)
    ];
    const sorted = mergeSort(cleanNulls(array));
    return sorted;
  }
}

function cleanNulls(array) {
  const cleaned = []
  array.forEach(element => {
    if (element !== null) {
  
    cleaned.push(element)
    }
  });
  return cleaned
}

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


const myTree = new Tree([6,5]);
console.log("myTree ", myTree);
console.log("myTree root ", myTree.root)
console.log("MyTree moves ", myTree.moves)

