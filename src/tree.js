import Node from "./node";
import { createBoardArray } from "./gameboard";

const gameboard = createBoardArray();

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  // Method to create all possible next possible positions from a node
  buildTree(array, depth = 1) {
    if (array.length === 0) return null;
    const root = new Node(array);

    if (depth < 7) {
      const nextArr = this.convertToNodes(this.sortedArray(root));
      console.log("next level, ", nextArr, nextArr.length);

      if (nextArr[0]) root.one = this.buildTree(nextArr[0].data, depth + 1);
      if (nextArr[1]) root.two = this.buildTree(nextArr[1].data, depth + 1);
      if (nextArr[2]) root.three = this.buildTree(nextArr[2].data, depth + 1);
      if (nextArr[3]) root.four = this.buildTree(nextArr[3].data, depth + 1);
      if (nextArr[4]) root.five = this.buildTree(nextArr[4].data, depth + 1);
      if (nextArr[5]) root.six = this.buildTree(nextArr[5].data, depth + 1);
      if (nextArr[6]) root.seven = this.buildTree(nextArr[6].data, depth + 1);
      if (nextArr[7]) root.eight = this.buildTree(nextArr[7].data, depth + 1);
    }
    return root;
  }

  find(value, root = this.root, arr = []) {
    if (root === null) return null;
    const properties = Object.keys(root);
    // remove data node
    properties.shift();

    // log each prop
    properties.forEach((prop) => {
      if (value[0] === root[prop].data[0] && value[1] === root[prop].data[1]) {
        console.log("found", value);
        arr.push(root[prop].data);
      }
    });
    return arr;
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
      properties.forEach((prop) => {
        levelOrderArray.push(this.root[prop].data);
      });
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
    const array = [];
    const moveOne = this.possibleMoves(root, +1, +2);
    const moveTwo = this.possibleMoves(root, +2, +1);
    const moveTree = this.possibleMoves(root, +2, -1);
    const moveFour = this.possibleMoves(root, +1, -2);
    const moveFive = this.possibleMoves(root, -1, -2);
    const moveSix = this.possibleMoves(root, -2, -1);
    const moveSeven = this.possibleMoves(root, -2, +1);
    const moveEight = this.possibleMoves(root, -1, +2);

    if (compareWithGameBoard(moveOne)) {
      array.push(moveOne);
      document
        .querySelector(`[data-coord="${moveOne}"]`)
        .classList.add("touched");
    }
    if (compareWithGameBoard(moveTwo)) {
      array.push(moveTwo);
      document
        .querySelector(`[data-coord="${moveTwo}"]`)
        .classList.add("touched");
    }
    if (compareWithGameBoard(moveTree)) {
      array.push(moveTree);
      document
        .querySelector(`[data-coord="${moveTree}"]`)
        .classList.add("touched");
    }
    if (compareWithGameBoard(moveFour)) {
      array.push(moveFour);
      document
        .querySelector(`[data-coord="${moveFour}"]`)
        .classList.add("touched");
    }
    if (compareWithGameBoard(moveFive)) {
      array.push(moveFive);
      document
        .querySelector(`[data-coord="${moveFive}"]`)
        .classList.add("touched");
    }
    if (compareWithGameBoard(moveSix)) {
      array.push(moveSix);
      document
        .querySelector(`[data-coord="${moveSix}"]`)
        .classList.add("touched");
    }
    if (compareWithGameBoard(moveSeven)) {
      array.push(moveSeven);
      document
        .querySelector(`[data-coord="${moveSeven}"]`)
        .classList.add("touched");
    }
    if (compareWithGameBoard(moveEight)) {
      array.push(moveEight);
      document
        .querySelector(`[data-coord="${moveEight}"]`)
        .classList.add("touched");
    }

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

function compareWithGameBoard(array) {
  if (array === null || gameboard.length === 0) return false;
  const coordOne = array[0];
  const coordTwo = array[1];

  for (let i = 0; i < gameboard.length; i++) {
    const gameOne = gameboard[i][0];
    const gameTwo = gameboard[i][1];

    if (gameOne === coordOne && gameTwo === coordTwo) {
      console.log("removing", array);
      gameboard.splice(i, 1);
      return true;
    }
  }
  return gameboard;
}

const myTree = new Tree([0,0]);
console.log("myTree ", myTree);
console.log("myTree root ", myTree.root);
console.log("MyTree child one ", myTree.root.one);
console.table(JSON.stringify(myTree, null, 4));
console.log(gameboard.length)
