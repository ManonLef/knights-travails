import {
  arrayIncludes,
  removeFromBoard,
  getBoard,
  getKnightPosition,
} from "./functions";
import { logStringGameArray, clog } from "./debug";

const start = getKnightPosition();
const end = [4, 5];

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

/// ////////////////////////
//       testing area     //
/// ////////////////////////

clog(`we start at [${start}] and want to find the shortest route to [${end}]`);
