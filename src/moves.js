import {
  arrayIncludes,
  removeFromBoard,
  getBoard,
  getKnightPosition,
} from "./functions";
import { logArray, clog } from "./debug";
import Node from "./node";

const start = getKnightPosition();
const end = [0,0];

const indexStart = arrayIncludes(start, getBoard());
removeFromBoard(indexStart);
console.log(
  "the board with the starting position removed. Has length",
  getBoard().length
);
logArray(getBoard());

const moves = [
  [-1, -2],
  [-2, -1],
  [-1, +2],
  [-2, +1],
  [+1, +2],
  [+2, +1],
  [+1, -2],
  [+2, -1],
];

// gets next moves from a single node/coordinate
function getNextMoves(coord) {
  const possibleMoves = [];
  for (let i = 0; i < moves.length; i++) {
    const col = coord[0] + moves[i][0];
    const row = coord[1] + moves[i][1];
    if (col >= 0 && row >= 0 && col <= 7 && row <= 7) {
      const move = [col, row];
      const visited = arrayIncludes(move, getBoard());
      if (visited >= 0) {
        // visited will be -1 (so true) if the array is already visited and removed
        // here we check for unvisited and push it and also removing from game array
        removeFromBoard(visited);
        possibleMoves.push(move);
        // consider moving the removal into another function
      }
    }
  }
  return possibleMoves;
}

const tree = new Node(start);

clog(`we start at [${start}] and want to find the shortest route to [${end}]`);

console.log(
  "///////////////////////// Testing a BFS /////////////////////////"
);

function findMoves() {
  const queue = [tree];
  const levelOrderArray = [];

  // if starting position equals end position
  if (checkMatch(tree.data)) return tree

  while (queue.length !== 0) {
    // take the root from the tree
    const node = queue.pop();
    // convert root children to nodes
    const nextLevel = childToNode(node);
    // if nextLevel contains the end node:
    if (nextLevel) {
      console.log("found (but not returning during testing)", nextLevel);
      return nextLevel;
    }
    // if not yet found
    console.log(
      "not found yet, continuing to extract the children",
      node.children
    );
    // for each of these children, queue and do the same
    node.children.forEach((child) => queue.unshift(child));
  }
}

console.log("finding our target node");
const target = findMoves();
console.log(logSteps(target));

function logSteps(node) {
  console.log(node);
  const queue = [node];
  const steps = [];

  while (queue.length !== 0) {
    const move = queue.pop();
    steps.unshift(move.data);
    if (move.parent) {
      queue.push(move.parent);
    }
  }
  console.log("count", steps.length - 1);
  logArray(steps)
  return steps;
}

console.log(
  "///////////////////////// Testing a tree setup /////////////////////////"
);

// console.log("tree level one ", tree.data);
// console.log(tree);
// console.log("match found while converting the above children to nodes?", start, end);
// console.log(childToNode());
// console.log("the kiddos of root level (level one) are now all nodes");
// console.log(tree.children);
// console.log("leaves gameboard at length", getBoard().length);

// create node of each child with a function
function childToNode(root = tree, nodes = root.children) {
  // for each of the children
  // set parent to root
  // set children
  for (let i = 0; i < nodes.length; i++) {
    nodes[i] = new Node(nodes[i]);
    nodes[i].parent = root;
    if (checkMatch(nodes[i].data)) return nodes[i];
  }
  return false;
}

// takes in coordinates and spits them out
function checkMatch(data) {
  if (data[0] === end[0] && data[1] === end[1]) {
    return true;
  } else return false;
}

console.log((tree))

export { getNextMoves };
