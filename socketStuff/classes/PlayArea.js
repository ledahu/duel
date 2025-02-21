import { Baballe } from './Baballe.js';

export class PlayArea {
  #height;
  #width;
  #baballes;
  constructor(height, width) {
    this.#height = height;
    this.#width = width;
    this.#baballes = Array(20)
      .fill(null)
      .map(() => new Baballe(Math.random() * this.#height, Math.random() * this.#width, 5));
  }

  get height() {
    return this.#height;
  }

  get width() {
    return this.#width;
  }

  get baballes() {
    return this.#baballes;
  }

  get baballesPos() {
    return this.#baballes.map((baballe) => ({ x: baballe.x, y: baballe.y }));
  }

  update() {
    this.#baballes.forEach((baballe) => {
      baballe.move();
      if (baballe.x < 0) {
        baballe.x = 0;
        baballe.changeDx();
      }
      if (baballe.x + baballe.collisionSquareSize > this.#width) {
        baballe.x = this.#width - baballe.collisionSquareSize;
        baballe.changeDx();
      }
      if (baballe.y <= 0) {
        baballe.y = 0;
        baballe.changeDy();
      }
      if (baballe.y + baballe.collisionSquareSize > this.#height) {
        baballe.y = this.#height - baballe.collisionSquareSize;
        baballe.changeDy();
      }
      if (Math.random() < 0.001) {
        baballe.changeSpeed();
      }
    });
  }
}
