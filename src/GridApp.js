import React, { Component } from 'react';
import Instructions from './components/Instructions';
import Controls from './components/Controls';
import Grid from './components/Grid';
import Feedback from './components/Feedback';

import Algo from './model/Algo';
import Cell from './model/Cell';
import Location from './model/Location';

// algorithms
import bfs from './algorithms/bfs'; // breadth first search
import astar from './algorithms/astar'; // A*
import { Matrix, nodeToPath } from './algorithms/utils';

class GridApp extends Component {

  state = {
    cells: this.initCells(10),
    algo: Algo.BFS,
    feedback: false,
  }

  startLocation = false; // Location object or false
  endLocation = false;   // Location object or false
  pathRendered = false;

  onClearAllClicked = () => {
    const cells = this.initCells(10);
    this.startLocation = false;
    this.endLocation = false;
    this.clearPath();
    this.setState({ cells });
  }

  onFindThePathClicked = () => {

    if (this.pathRendered) return;

    const algo = this.state.algo === Algo.ASTAR ? astar : bfs;

    const m = new Matrix(this.state.cells, this.startLocation, this.endLocation);
    const result = algo(m.startLoc, m.endTest, m.getSuccessors, m.eucledianDistance(this.endLocation));
    if (result) {
      this.setState({ feedback: false });
    } else {
      this.setState({ feedback: true });
    }

    const shortestPath = nodeToPath(result);

    const cells = this.deepCopy(this.state.cells);
    for (let i = 0; i < shortestPath.length; i++) {
      const loc = shortestPath[i];
      cells[loc.x][loc.y] = i + 1;
    }

    this.pathRendered = true;
    this.setState({ cells });
  }

  onSetAlgoClicked = algo => {
    this.clearPath();
    this.setState({algo})
  };
  
  onGridClicked = (x, y, rightClick = false) => {
    const cells = this.deepCopy(this.state.cells);
    this.clearPath(cells);

    if (rightClick) { // picking start and end
      if (this.endLocation) { // both start and end have been already picked
        this.processRightClick_StartPicked_EndPicked(cells, x, y);
      } else if (this.startLocation) { // only start have been picked so far
        this.processRightClick_StartPicked_EndStillClear(cells, x, y);
      } else { // neither start not end have been picked so far
        this.processRightClick_StartStillclear_EndStillClear(cells, x, y);
      }
    } else { // left-click, another brick in the wall, just toggle
      if (cells[x][y] === Cell.WALL) {
        cells[x][y] = Cell.CLEAN;
      } else if (cells[x][y] === Cell.CLEAN) {
        cells[x][y] = Cell.WALL;
      } else { // do not touch end and start
        return;
      }
    }
    this.setState(state => { return { ...state, cells }  });
  }

  deepCopy = cells => {
    const newCells = [];
    for (const row of cells) {
      const newRow = [...row];
      newCells.push(newRow);
    }
    return newCells;
  }

  clearPath = cellsFrom => {
    const cells = cellsFrom ? cellsFrom : this.deepCopy(this.state.cells);
    for (const row of cells) {
      for (let i = 0; i < row.length; i++) {
        if (row[i] && ! isNaN(row[i])) {
          row[i] = Cell.CLEAN;
        }
      }
    }
    this.pathRendered = false;
    this.setState({ cells, feedback: false });
  }
  
  processRightClick_StartStillclear_EndStillClear(cells, x, y) {
    cells[x][y] = Cell.START;
    this.startLocation = new Location(x, y);
  }

  processRightClick_StartPicked_EndStillClear(cells, x, y) {
    const xOldStart = this.startLocation.x;
    const yOldStart = this.startLocation.y;
    if (xOldStart === x && yOldStart === y) { // right clicked on the previously picked start
      cells[xOldStart][yOldStart] = Cell.CLEAN;
      this.startLocation = false;
    }
    else {
      cells[x][y] = Cell.END;
      this.endLocation = new Location(x, y);
    }
  }

  processRightClick_StartPicked_EndPicked(cells, x, y) {
    const xOldEnd = this.endLocation.x;
    const yOldEnd = this.endLocation.y;
    const xOldStart = this.startLocation.x;
    const yOldStart = this.startLocation.y;
    cells[xOldEnd][yOldEnd] = Cell.CLEAN;
    if (xOldEnd === x && yOldEnd === y) { // right clicked on the previously picked end, clean the end
      this.endLocation = false;
    }
    else if (xOldStart === x && yOldStart === y) { // right clicked on the preiously picked start, clean both, start and end
      cells[xOldStart][yOldStart] = Cell.CLEAN;
      this.startLocation = false;
      this.endLocation = false;
    }
    else {
      cells[x][y] = Cell.END;
      this.endLocation = new Location(x, y);
    }
  }

  initCells(n) {
    let ret = []; // 2d array
  
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push(Cell.CLEAN);
      }
      ret.push(row);
    }
  
    return ret;
  }

  render() {
    return <>
      <Instructions />
      <Controls
        algo={this.state.algo}
        setAlgo={this.onSetAlgoClicked}
        runAlgo={this.onFindThePathClicked}
        clearAll={this.onClearAllClicked}
        readyToRun={this.startLocation && this.endLocation}
      />
      <Grid
        gridClicked={this.onGridClicked}
        cells={this.state.cells}
      />
      <Feedback show={this.state.feedback} />
    </>;
  }

}

export default GridApp;
