import { removeFromBoard, arrayIncludes, getBoard } from "./functions";
import { getNextMoves } from "./moves";


export default class Node {
  constructor(coords) {
    this.data = coords;
    this.parent = null;
    this.children = getNextMoves(this.data);
  }
}


