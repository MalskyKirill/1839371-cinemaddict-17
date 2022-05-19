import PopupView from '../view/popup-view.js';
import { render, remove, replace } from '../framework/render.js';

const siteFooterElement = document.querySelector('.footer');
const body = document.querySelector('body');

export default class PopupPresentor {

  #film = null;

  #popupComponent = null;
  #changeData = null;

  constructor (changeData) {
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        body.classList.remove('hide-overflow');
        remove(this.#popupComponent );
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const prevPopupComponent = this.#popupComponent;

    this.#popupComponent = new PopupView(film);

    this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);

    this.#popupComponent .setPopupCloseClickHandler(()=> {
      body.classList.remove('hide-overflow');
      remove(this.#popupComponent );
      document.removeEventListener('keydown', onEscKeyDown);
    });

    document.addEventListener('keydown', onEscKeyDown);
    body.classList.add('hide-overflow');

    if (prevPopupComponent === null) {
      render(this.#popupComponent, siteFooterElement, 'afterend');
      return;
    }

    if (siteFooterElement.contains(prevPopupComponent.element)){
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevPopupComponent);
  };

  destroy = () => {
    remove(this.#popupComponent);
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#film, userDetails: {favorite: !this.#film.userDetails.favorite}});

  };

  #handleWatchlistClick = () => {
    this.#changeData({...this.#film, userDetails: {watchlist: !this.#film.userDetails.watchlist}});

  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData({...this.#film, userDetails: {alreadyWatched: !this.#film.userDetails.alreadyWatched}});

  };

}
