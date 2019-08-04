import Cell from '../model/Cell';

export default n => {
  let ret = []; // 2d array

  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(Cell.CLEAN);
    }
    ret.push(row);
  }

  return ret;
};
