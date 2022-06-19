import AbstractView from '../framework/view/abstract-view.js';
import { humanizeFilmDueDate } from '../utils/film.js';
import { getTimeFromMins } from '../utils/common.js';

const createFilmCardTemplate = (film) => {
  const {filmInfo, comments, userDetails} = film;
  const date = humanizeFilmDueDate(filmInfo.release.date);
  const time = getTimeFromMins(filmInfo.runtime);

  const alreadyWatched = userDetails.alreadyWatched
    ? 'film-card__controls-item--active'
    : '';

  const watchlist = userDetails.watchlist
    ? 'film-card__controls-item--active'
    : '';

  const favorite = userDetails.favorite
    ? 'film-card__controls-item--active'
    : '';

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${date}</span>
          <span class="film-card__duration">${time}</span>
          <span class="film-card__genre">${filmInfo.genre.join(', ')}</span>
        </p>
        <img src="${filmInfo.poster}" alt="${filmInfo.alternativeTitle}" class="film-card__poster">
        <p class="film-card__description">${filmInfo.description}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item ${watchlist} film-card__controls-item--add-to-watchlist " type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${favorite}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCardView extends AbstractView{
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setPopupOpenClickHandler = (callback) => {
    this._callback.popupOpenClick = callback;
    this.element.addEventListener('click', this.#popupOpenClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.favoriteClick();
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.alreadyWatchedClick();
  };

  #watchlistClickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.watchlistClick();
  };

  #popupOpenClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupOpenClick();
  };

}

