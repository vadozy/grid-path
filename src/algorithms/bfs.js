/*
 *    Breadth-first search algorithm
 */
import { Queue, Node } from './utils';

/*
 * Types:
 * 
 * startLoc: Location
 * endTest: (loc: Location) => boolean
 * getSuccessors: (loc: Location) => Array<Location>
 * 
 * returned type: Location or undefined
 * 
 */
export default function(startLoc, endTest, getSuccessors) {
  const frontier = new Queue();
  frontier.push(new Node(startLoc, undefined));
  const visited = new Set();
  visited.add(startLoc.hash());

  while (frontier.length > 0) {
    const currentNode = frontier.pop();
    const currentLoc = currentNode.state;
    if (endTest(currentLoc)) {
      return currentNode;
    }
    for (const successorLoc of getSuccessors(currentLoc)) {
      if (visited.has(successorLoc.hash())) {
        continue;
      }
      visited.add(successorLoc.hash());
      frontier.push(new Node(successorLoc, currentNode));
    }
  }

  return undefined; // Solution is not found
}
