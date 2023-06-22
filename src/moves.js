import {
  arrayIncludes,
  removeFromBoard,
  getBoard,
  getKnightPosition,
} from "./functions";
import { logArray, clog } from "./debug";
import Node from "./node";

const start = getKnightPosition();
const end = [7, 7];

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

const tree = new Node(start);

clog(`we start at [${start}] and want to find the shortest route to [${end}]`);

function findShortestPath() {
  const queue = [tree];
  if (checkMatch(tree.data)) return tree;

  while (queue.length !== 0) {
    const node = queue.pop();
    // create and convert root children to nodes
    node.children = getChildren(node.data);
    const children = checkChildren(node);
    // if children contain the end node, return the node to traverse:
    if (children) {
      return traverseSteps(children);
    }
    // for each of these children, queue and do the same
    node.children.forEach((child) => queue.unshift(child));
  }
  return null;
}

function traverseSteps(node) {
  if (node === null) return null;
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
  logArray(steps);
  return steps;
}

function getChildren(coord) {
  const possibleMoves = [];
  for (let i = 0; i < moves.length; i += 1) {
    const col = coord[0] + moves[i][0];
    const row = coord[1] + moves[i][1];
    if (col >= 0 && row >= 0 && col <= 7 && row <= 7) {
      const visited = arrayIncludes([col, row], getBoard());
      if (visited >= 0) {
        // visited will be -1 (so true) if the array is already visited and removed
        // here we check for unvisited and push it and also removing from game array
        removeFromBoard(visited);
        possibleMoves.push([col, row]);
        // consider moving the removal into another function
      }
    }
  }
  return possibleMoves;
}

function checkChildren(root = tree) {
  const {children} = root
  // for each of the children, set parent to root, convert children to nodes, check match
  for (let i = 0; i < children.length; i += 1) {
    children[i] = new Node(children[i]);
    children[i].parent = root;
    if (checkMatch(children[i].data)) return children[i];
  }
  return false;
}

function checkMatch(data) {
  if (data[0] === end[0] && data[1] === end[1]) return true;
  return false;
}

findShortestPath();
