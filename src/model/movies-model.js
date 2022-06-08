import Observable from '../framework/observable.js';
import { generateMovie } from '../mock/movie-fish.js';

export default class MoviesModel extends Observable{
  #movies = Array.from({length: 8}, generateMovie);

  get movies() {
    return this.#movies;
  }

  deleteComment = (updateType, filmId, commentId) => {
    const film = this.#movies.find((f) => f.id === filmId);

    if (film === undefined) {
      throw new Error('Can not update unexiting film');
    }
    const newFilm = {
      ...film,
      comments: film.comments.filter((id) => id !== commentId)
    };
    this.updateFilm(updateType, newFilm);
  };

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
