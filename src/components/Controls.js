import React from 'react';
import Algo from '../model/Algo';

export default props => {

  const bfsClass = ['button-01', props.algo === Algo.BFS ? ' active' : ''].join(' ');
  const astarClass = ['button-01', props.algo === Algo.ASTAR ? ' active' : ''].join(' ');

  const findThePathClass = ['button-01', props.readyToRun ? '' : ' disabled'].join(' ');

  function setAlgo(ev, algo) {
    ev.preventDefault();
    props.setAlgo(algo);
  }
  
  function clearAll(ev) {
    ev.preventDefault();
    props.clearAll();
  }

  function runAlgo(ev) {
    ev.preventDefault();
    if (props.readyToRun) {
      props.runAlgo();
    }
  }

  return <>
    <div className="top-buttons-container">
      <div>
        <a className="button-01" href="/#" onClick={ev => clearAll(ev)} >Clear All</a>
        <a className={findThePathClass} href="/#" onClick={ev => runAlgo(ev)}>Find the Path</a>
      </div>

      <div>
        <a className={bfsClass} href="/#" onClick={ev => setAlgo(ev, Algo.BFS)} >Algo 1</a>
        <a className={astarClass} href="/#" onClick={ev => setAlgo(ev, Algo.ASTAR)}>Algo 2</a>
      </div>
    </div>
  </>

};