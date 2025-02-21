import { PlayArea } from './PlayArea.js';

export class Room {
  /** @type {string} */
  #id;

  /** @type {{username: string, msg: number}[]} */
  #chatHistory;

  /** @type {PlayArea} */
  #playArea;

  /** @type {number} */
  #size;

  constructor(id, playArea) {
    this.#id = id;
    this.#playArea = playArea;
    this.#chatHistory = [];
    this.#size = 0;
  }

  get id() {
    return this.#id;
  }

  get chatHistory() {
    return this.#chatHistory;
  }

  get playArea() {
    return this.#playArea;
  }

  get size() {
    return this.#size;
  }

  join() {
    this.#size++;
  }

  leave() {
    this.#size--;
  }

  /**
   * Add an entry to the chatHistory
   * @param {{username: string, msg: number}} chatEntry
   */
  addToChatHistory(chatEntry) {
    this.#chatHistory.push(chatEntry);
  }
}
