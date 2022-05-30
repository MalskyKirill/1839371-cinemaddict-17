import Observable from '../framework/observable.js';
import { generateMovie } from '../mock/movie-fish.js';

export default class MoviesModel extends Observable{
  #movies = Array.from({length: 8}, generateMovie);

  get movies() {
    return this.#movies;
  }

  updateFilm = (updateType, update) => {
    const index = this.#movies.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can not update unexiting film');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      update,
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

}
