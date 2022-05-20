import FilmCardView from '../view/film-card-view.js';
import PopupPresentor from './popup-presentor.js';
import { render, replace, remove } from '../framework/render.js';

export default class FilmPresentor {

  #filmComponent = null;
  #filmsListConteinerComponent = null;
  #changeData = null;

  #film = null;
  #popupPresentor = null;

  constructor (filmsListConteinerComponent, changeData) {
    this.#filmsListConteinerComponent = filmsListConteinerComponent;
    this.#changeData = changeData;
  }


  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView(film);

    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);


    this.#filmComponent.setPopupOpenClickHandler(() => {
      this.#popupPresentor = new PopupPresentor(this.#changeData);
      this.#popupPresentor.init(film);
    });


    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmsListConteinerComponent);
      return;
    }

    if (this.#filmsListConteinerComponent.contains(prevFilmComponent.element)){
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);

  };

  destroy = () => {
    remove(this.#filmComponent);
  };

  #handleFavoriteClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite}
    });
  };

  #handleWatchlistClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist
      }
    });
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched
      }
    });
  };

}
