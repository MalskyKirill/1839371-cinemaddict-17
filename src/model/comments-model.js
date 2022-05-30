import Observable from '../framework/observable.js';
import { generateComments } from '../mock/movie-fish.js';

export default class CommentsModel extends Observable {

  #comments = Array.from({length: 4}, generateComments);

  get comments() {
    return this.#comments;
  }

  addComments = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  };

  deleteComments = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can not delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}