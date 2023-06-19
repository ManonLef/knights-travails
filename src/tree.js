import Node from "./node";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  // Method to create all possible next possible positions from a node
  buildTree(array, depth = 1) {
    if (array.length === 0) return null;
    const root = new Node(array);
    console.log("yay", root);
    ////////////////////
    // create children
    ////////////////////

    // array of all children to be rendered
    const arr = this.convertToNodes(this.sortedArray(root));
    console.log("arr ", arr);
    if (arr[0]) root.one = arr[0];
    if (arr[1]) root.two = arr[1];
    if (arr[2]) root.three = arr[2];
    if (arr[3]) root.four = arr[3];
    if (arr[4]) root.five = arr[4];
    if (arr[5]) root.six = arr[5];
    if (arr[6]) root.seven = arr[6];
    if (arr[7]) root.eight = arr[7];

    return root;
  }

  find(value, root = this.root) {
    if (root === null) return null;
    const properties = Object.keys(root);
    // remove data node
    properties.shift()

    // log each prop
    properties.forEach((prop) => {
      // this.find(value, this.root[prop])
      if (value[0] === this.root[prop].data[0] && value[1] === this.root[prop].data[1]) console.log("found", value);
    });
  }

  levelOrder() {
    if (this.root === null) return [];

    const queue = [this.root];
    const levelOrderArray = [];

    while (queue.length !== 0) {
      const node = queue.pop();
      levelOrderArray.push(node.data);

      const properties = Object.keys(this.root);
      properties.shift();
      console.log(properties);
      properties.forEach((prop) => levelOrderArray.push(this.root[prop].data));
    }
    return levelOrderArray;
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
    for (let i = 0; i < array.length; i++) {
      array[i] = new Node(array[i]);
    }
    return array;
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

  sortedArray(root) {
    const array = [
      this.possibleMoves(root, +1, +2),
      this.possibleMoves(root, +2, +1),
      this.possibleMoves(root, +2, -1),
      this.possibleMoves(root, +1, -2),
      this.possibleMoves(root, -1, -2),
      this.possibleMoves(root, -2, -1),
      this.possibleMoves(root, -2, +1),
      this.possibleMoves(root, -1, +2),
    ];
    const sorted = mergeSort(cleanNulls(array));
    return sorted;
  }
}

function cleanNulls(array) {
  const cleaned = [];
  array.forEach((element) => {
    if (element !== null) {
      cleaned.push(element);
    }
  });
  return cleaned;
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

const myTree = new Tree([6, 5]);
console.log("myTree ", myTree);
console.log("myTree root ", myTree.root);
console.log("MyTree child one ", myTree.root.one);
console.log("find ", myTree.find([4, 6]));
