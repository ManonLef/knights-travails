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

function getNextLevel(array) {
  const nextLevel = [];
  const nextLevelSeparate = [];
  for (let i = 0; i < array.length; i++) {
    // only push when in game array
    const nextArray = getNextMoves(array[i], moves);
    nextLevel.push(nextArray);
    // for (let j = 0; j < nextArray.length; j++) {
    //   nextLevelSeparate.push(nextArray[j]);
    // }
  }
  return [nextLevel, nextLevelSeparate];
}

/// ////////////////////////
//       testing area     //
/// ////////////////////////

// so now we want to repeat this cycle for each level until the node is found that will lead us to the parent
// I'll use a queue for this similar to my BST levelOrder function

// get tree data
// get children
// generate nodes from children and push those nodes to the queue to convert their children
// found? push parents to array
const tree = new Node(start);

console.log(
  "///////////////////////// Testing a BFS /////////////////////////"
);

function findMoves() {
  const queue = [tree];
  const levelOrderArray = [];

  // if starting position equals end position
  if (checkMatch(tree.data)) console.log("noob");

  while (queue.length !== 0) {
    // take the root from the tree
    const node = queue.pop();
    // convert root children to nodes
    const nextLevel = childToNode(node)
    // if nextLevel contains the end node:
    if (nextLevel) console.log("found (but not returning during testing)", nextLevel)
    // if not yet found
    console.log("not found yet, continuing to extract the children", node.children)
    // for each of these children, queue and do the same 
    node.children.forEach(child => queue.push(child))
  }
}
findMoves();

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

console.log(
  "///////////////////////// Step through functions /////////////////////////"
);
clog(`we start at [${start}] and want to find the shortest route to [${end}]`);

// when getting next moves:
// - get moves
//    - check if they're visited yet (still in game array)
//    - if not, push
//    - remove from game array
//    - if already visited, skip
const levelOne = getNextMoves(start);

console.log(
  "level 1 with length ",
  levelOne.length,
  "leaves gameboard at ",
  getBoard().length
);
logArray(levelOne);

const levelTwo = getNextLevel(levelOne);
const levelTwoNested = levelTwo[0];
const levelTwoSanitized = levelTwo[1];

console.log("level two");
logArray(levelTwoNested);
console.log("level two nested length is ", levelTwoNested.length);
levelTwoNested.forEach((element) => {
  console.log("level two elements");
  logArray(element);
});
console.log(
  "a sanitized level two version can be found here, handy for level three ;), with length",
  levelTwoSanitized.length,
  "leaves gameboard at ",
  getBoard().length
);
logArray(levelTwoSanitized);

const levelThree = getNextLevel(levelTwoSanitized);

console.log(
  "levelThree is where it gets tricky, it has length of ",
  levelThree[1].length,
  "if you don't count the empty children",
  "leaves gameboard at ",
  getBoard().length
);
logArray(levelThree);
console.log("unsanitized");
logArray(levelThree[0]);
console.log(
  "sanitized also removes empty elements which might make it harder to tie to parent"
);
logArray(levelThree[1]);

console.log("the board now looks like this:", getBoard().length);
logArray(getBoard());

// next steps would be tying these up as children to the starting nodes
// BFS needs a queue
// I'd first queue the initial item
// then calculate next steps from that
// check if the array that's output has the end position
// if not, pass each item in the queue as next step, with the passed item getting a reference to the child,
// and the child getting a reference back to the parent
// rinse and repeat

export { getNextMoves };
