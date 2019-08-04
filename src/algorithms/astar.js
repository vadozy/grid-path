/*
 *    A* search search algorithm
 */
import { Node } from './utils';
import PriorityQueue from 'tinyqueue';

/*
 * Types:
 * 
 * startLoc: Location
 * endTest: (loc: Location) => boolean
 * getSuccessors: (loc: Location) => Array<Location>
 * heuristic: (loc: Location) => number
 * 
 * returned type: Location or undefined
 * 
 */
export default function(startLoc, endTest, getSuccessors, heuristic) {
  const frontier = new PriorityQueue();
  frontier.push(new Node(startLoc, undefined, 0.0, heuristic(startLoc)));
  const visited = new Map();
  visited.set(startLoc.hash(), 0.0);

  while (frontier.length > 0) {
    const currentNode = frontier.pop();
    const currentLoc = currentNode.state;
    if (endTest(currentLoc)) {
      return currentNode;
    }
    for (const successorLoc of getSuccessors(currentLoc)) {
      const newCost = currentNode.cost + 1; // 1 works for grid, need a cost function for more sophisticated structures
      if (!visited.has(successorLoc.hash()) || visited.get(successorLoc.hash()).cost > newCost) {
        visited.set(successorLoc.hash(), newCost, heuristic(successorLoc));
        frontier.push(new Node(successorLoc, currentNode, newCost, heuristic(successorLoc)));
      }
    }
  }

  return undefined; // Solution is not found
}