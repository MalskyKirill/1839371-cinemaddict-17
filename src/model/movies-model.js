import Observable from '../framework/observable.js';

import { UpdateType } from '../const.js';

export default class MoviesModel extends Observable{
  #movieApiService = null;

  #movies = [];

  constructor(movieApiService) {
    super();
    this.#movieApiService = movieApiService;

  }

  get movies() {
    return this.#movies;
  }

  init = async () => {
    try {
      const movies = await this.#movieApiService.movies;
      this.#movies = movies.map(this.#adaptToClient);
    } catch(err) {
      this.#movies = [];
    }

    this._notify(UpdateType.INIT);
  };


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

  addComment = (updateType, update) => {
    const film = this.#movies.find((f) => f.id === update.filmId);
    film.comments.push(update.commentId);
    this._notify(updateType, film);
  };

  updateFilm = async (updateType, update) => {
    await this.#movieApiService.updateFilms(update);

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

  #adaptToClient = (film) => {
    const adaptedFilm = {...film,
      filmInfo: {
        ...film['film_info'],
        ageRating: film['film_info']['age_rating'],
        alternativeTitle: film['film_info']['alternative_title'],
        totalRating: film['film_info']['total_rating'],
        release: {
          ...film['film_info']['release'],
          releaseCountry: film['film_info']['release']['release_country'],
        }
      },
      userDetails: {
        ...film['user_details'],
        alreadyWatched: film['user_details']['already_watched'],
        watchingDate: film['user_details']['watching_date'],
      }


    };

    delete adaptedFilm['film_info'];
    delete adaptedFilm.filmInfo['age_rating'];
    delete adaptedFilm.filmInfo['alternative_title'];
    delete adaptedFilm.filmInfo['total_rating'];
    delete adaptedFilm.filmInfo['release']['release_country'];
    delete adaptedFilm['user_details'];
    delete adaptedFilm.userDetails['already_watched'];
    delete adaptedFilm.userDetails['watching_date'];


    return adaptedFilm;
  };

}


