export class Baballe {
  #x;
  #y;
  #radius;
  #dx;
  #dy;
  #speed;
  constructor(x, y, radius) {
    this.#x = x;
    this.#y = y;
    this.#radius = radius;
    this.#dx = Math.random();
    this.#dy = Math.random();
    this.#speed = Math.ceil(Math.random() * 10) + 10;
  }

  get x() {
    return this.#x;
  }

  set x(value) {
    this.#x = value;
  }

  get y() {
    return this.#y;
  }

  set y(value) {
    this.#y = value;
  }

  get radius() {
    return this.#radius;
  }

  get dx() {
    return this.#dx;
  }

  get dy() {
    return this.#dy;
  }

  get speed() {
    return this.#speed;
  }

  get collisionSquareSize() {
    return this.#radius * 2;
  }

  move() {
    this.#x += this.#dx * this.#speed;
    this.#y += this.#dy * this.#speed;
  }

  changeDx() {
    this.#dx = -this.#dx;
  }

  changeDy() {
    this.#dy = -this.#dy;
  }

  changeSpeed() {
    this.#speed = Math.ceil(Math.random() * 5) + 5;
  }
}
