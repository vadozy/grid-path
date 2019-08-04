import React, { Component } from 'react';
import Cell from '../model/Cell';

class GridCell extends Component {

  state = {
    dummy: 1
  }

  timer = null;

  pathCounter = null;

  componentDidUpdate(prevProps, prevState, snapshot) {
    const delay = this.props.cell;
    if (delay === prevProps.cell) {
      return;
    };

    this.pathText = this.props.cell;

    if (delay && ! isNaN(delay)) {
      this.pathCounter = this.props.cell;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.setState(state => {
          return {
            dummy: state.dummy + 1
          };
        });
      }, 150 * delay);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { onClick, onContextMenu, cell } = {...this.props};

    let cellClass = 'cell';
    let text = '';

    switch(cell) {
      case Cell.START:
        cellClass += ' start';
        break;
      case Cell.END:
        cellClass += ' end';
        break;
      case Cell.WALL:
        cellClass += ' wall';
        break;
      case Cell.CLEAN:
        break;
      default: // The Path
        // code block
    }

    if (this.pathCounter) {
      cellClass = 'cell path';
      text = this.pathCounter;
      this.pathCounter = null;
    }

    return <div className={cellClass} {...{onClick, onContextMenu }}>{text}</div>;
  }

}

export default GridCell;
