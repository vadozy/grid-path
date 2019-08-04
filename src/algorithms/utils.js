import Cell from '../model/Cell';
import Location from '../model/Location';

class Node {
  constructor(state, parentNode, cost=0, heuristic=0) {
    this.state = state;
    this.parentNode = parentNode;
    this.cost = cost; // used in astar algo only
    this.heuristic = heuristic; //  sed in astar algo only
  }

  // valueOf helps to compare 2 objects using operators > and <
  // must return a number to work correctly
  valueOf() {
    return this.cost + this.heuristic;
  }
}

class Queue {

  _items = [];
  length = 0;

  push(el) {
    this.length++;
    this._items.push(el);
  }

  pop() {
    if (this.length > 0) {
      this.length--;
      return this._items.shift();
    } else {
      return undefined;
    }
  }
}

class Matrix {
  constructor(cells, startLoc, endLoc) {
    this.startLoc = startLoc;
    this.endLoc = endLoc;
    this.cells = cells; // MUST NOT MUTATE, this is a slice of React state
  }

  endTest = loc => {
    return loc.x === this.endLoc.x && loc.y === this.endLoc.y;
  }

  getSuccessors = loc => {
    const successors = [];

    if (loc.x + 1 < this.cells.length && this.cells[loc.x + 1][loc.y] !== Cell.WALL) {
      successors.push(new Location(loc.x + 1, loc.y));
    }
    if (loc.x - 1 >= 0 && this.cells[loc.x - 1][loc.y] !== Cell.WALL) {
      successors.push(new Location(loc.x - 1, loc.y));
    }
    if (loc.y + 1 < this.cells[0].length && this.cells[loc.x][loc.y + 1] !== Cell.WALL) {
      successors.push(new Location(loc.x, loc.y + 1));
    }
    if (loc.y - 1 >= 0 && this.cells[loc.x][loc.y - 1] !== Cell.WALL) {
      successors.push(new Location(loc.x, loc.y - 1));
    }
    return successors;
  }

  // used by A* algorithm
  eucledianDistance = endLoc => {
    return loc => {
      const x = loc.x - endLoc.x;
      const y = loc.y - endLoc.y;
      return Math.sqrt(x**2 + y**2);
    };
  }

}

function nodeToPath(node) {
  const path = [];
  while (node) {
    path.push(node.state);
    node = node.parentNode;
  }
  
  // remove the start and the end
  path.shift();
  path.pop();

  path.reverse();
  return path
}

export { Node, Queue, Matrix, nodeToPath }
