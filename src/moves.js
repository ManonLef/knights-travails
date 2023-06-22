import {
  arrayIncludes,
  removeFromBoard,
  getBoard,
  getKnightPosition,
} from "./functions";
import { logArray, clog } from "./debug";
import Node from "./node";

const start = getKnightPosition();
const end = [7,7];

const indexStart = arrayIncludes(start, getBoard());
removeFromBoard(indexStart);

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
  for (let i = 0; i < moves.length; i += 1) {
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

function findMoves() {
  const queue = [tree];
  // if starting position equals end position return the root node
  if (checkMatch(tree.data)) return tree
  while (queue.length !== 0) {
    const node = queue.pop();
    // create and convert root children to nodes
    node.children = getNextMoves(node.data)
    const children = checkChildren(node);
    // if children contain the end node, return the node to traverse:
    if (children) {
      return children;
    }
    // for each of these children, queue and do the same
    node.children.forEach((child) => queue.unshift(child));
  }
  return null
}

function checkChildren(root = tree, nodes = root.children) {
  // for each of the children, set parent to root, convert children to nodes
  for (let i = 0; i < nodes.length; i++) {
    nodes[i] = new Node(nodes[i]);
    nodes[i].parent = root;
    if (checkMatch(nodes[i].data)) return nodes[i];
  }
  return false;
}

function logSteps(node) {
  if (node === null) return null
  // console.log(node);
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

function checkMatch(data) {
  if (data[0] === end[0] && data[1] === end[1]) {
    return true;
  } else return false;
}

const target = findMoves();
logSteps(target);