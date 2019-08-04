import React from 'react';
import GridCell from './GridCell';

export default ({ gridClicked, cells }) => {
  const GridCells = [];
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      const key = i + '-' + j;
      const onClick = () => gridClicked(i, j); // Left-click
      const onContextMenu = ev => { // Right-click
        ev.preventDefault();
        gridClicked(i, j, true);
      }
      GridCells.push(<GridCell cell={cells[i][j]} {...{key, onClick, onContextMenu }} ></GridCell>);
    }
  }
  return <main className="grid">{GridCells}</main>
};
