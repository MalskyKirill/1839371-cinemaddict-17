import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';
import { render, replace, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';

const body = document.querySelector('body');

export default class FilmPresenter {

  #filmComponent = null;
  #filmsListConteinerComponent = null;
  #changeData = null;

  #film = null;
  #popupPresenter = null;
  #isPopupOpen = false;
  #onPopupOpen = null;


  constructor (filmsListConteinerComponent, changeData, onPopupOpen) {
    this.#filmsListConteinerComponent = filmsListConteinerComponent;
    this.#changeData = changeData;
    this.#onPopupOpen = onPopupOpen;

    const onClose = () => {
      this.closePopup();
    };
    this.#popupPresenter = new PopupPresenter(this.#changeData, onClose);
  }

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView(film);

    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);


    this.#filmComponent.setPopupOpenClickHandler(() => {

      this.#onPopupOpen();
      this.#popupPresenter.init(film, true);
      this.#isPopupOpen = true;
    });

    if (this.#isPopupOpen) {
      this.#popupPresenter.init(film, false);
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

  setDisabled() {
    this.#filmComponent.setDisabled();
  }

  setEnabled() {
    this.#filmComponent.setEnabled();
  }

  destroy = () => {
    remove(this.#filmComponent);
  };

  closePopup = () => {
    if (this.#popupPresenter === null) {
      return;
    }
    body.classList.remove('hide-overflow');
    this.#popupPresenter.destroy();
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
