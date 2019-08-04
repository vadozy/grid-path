import React from 'react';

export default () => (

  <div className="instructions">
  <h3>Instructions</h3>
    <ul>
      <li>Right-click on a cell to pick <span style={{color:'green', fontWeight: 'bold'}}>"The Start"</span> (right-click again to clear)</li>
      <li>Right-click on another cell to pick <span style={{color:'red', fontWeight: 'bold'}}>"The End"</span> (right-click again to clear)</li>
      <li>Left-click on a few more cells to build <span style={{color:'black', fontWeight: 'bold'}}>"The Wall"</span> (left-click again to clear)</li>
      <li>Press "Find the Path" button to compute the <span style={{color:'blue', fontWeight: 'bold'}}>Shortest Path</span></li>
      <li>Switch the Algo to a better one and press "Find the Path" again</li>
    </ul>
  </div>

);