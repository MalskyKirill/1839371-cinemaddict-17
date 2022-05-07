import { generateMovie } from '../mock/movie-fish.js';

export default class MoviesModel {
  #movies = Array.from({length: 3}, generateMovie);

  get movies() {
    return this.#movies;
  }
}
