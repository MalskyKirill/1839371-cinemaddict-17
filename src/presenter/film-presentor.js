import FilmCardView from '../view/film-card-view.js';
import PopupPresentor from './popup-presentor.js';
import { render, replace, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';

const body = document.querySelector('body');

export default class FilmPresentor {

  #filmComponent = null;
  #filmsListConteinerComponent = null;
  #changeData = null;

  #film = null;
  #popupPresentor = null;
  #isPopupOpen = false;
  #onPopupOpen = null;


  constructor (filmsListConteinerComponent, changeData, onPopupOpen) {
    this.#filmsListConteinerComponent = filmsListConteinerComponent;
    this.#changeData = changeData;
    this.#onPopupOpen = onPopupOpen;

    const onClose = () => {
      this.closePopup();
    };
    this.#popupPresentor = new PopupPresentor(this.#changeData, onClose);
  }

  // get comments() {
  //   return this.#commentsModel.comments;
  // }


  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView(film);

    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);


    this.#filmComponent.setPopupOpenClickHandler(() => {

      this.#onPopupOpen();
      // this.#popupPresentor = new PopupPresentor(this.#changeData, onClose);
      this.#popupPresentor.init(film, true);
      this.#isPopupOpen = true;
    });

    if (this.#isPopupOpen) {
      this.#popupPresentor.init(film, false);
    }

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

  closePopup = () => {
    if (this.#popupPresentor === null) {
      return;
    }
    body.classList.remove('hide-overflow');
    this.#popupPresentor.destroy();
    this.#isPopupOpen = false;
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          favorite: !this.#film.userDetails.favorite}
      });
  };

  #handleWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          watchlist: !this.#film.userDetails.watchlist
        }
      });
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          alreadyWatched: !this.#film.userDetails.alreadyWatched
        }
      });
  };

}
