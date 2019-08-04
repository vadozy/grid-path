export default class Location {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  // unique string representtion of the object
  hash() {
    return this.x + '-' + this.y;
  }
}
