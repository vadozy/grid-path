/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const Instructions = () => (

  <div className="instructions">
  <h3>Mouse Instructions</h3>
    <ul>
      <li>Right-click on a cell to pick <span style={{color:'green', fontWeight: 'bold'}}>"The Start"</span> (to clear, right-click again)</li>
      <li>Right-click on another cell to pick <span style={{color:'red', fontWeight: 'bold'}}>"The End"</span> (to clear, right-click again)</li>
      <li>Left-click on more cells to build <span style={{color:'black', fontWeight: 'bold'}}>"The Wall"</span> (to clear, left-click again)</li>
      <li>Press "Find the Path" button to compute the <span style={{color:'blue', fontWeight: 'bold'}}>Shortest Path</span></li>
      <li>Switch the Algo and press "Find the Path" again</li>
    </ul>
  </div>

);

export default Instructions;