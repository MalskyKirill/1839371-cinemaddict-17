import PopupView from '../view/popup-view.js';
import { render, remove, replace } from '../framework/render.js';
import { UpdateType, UserAction } from '../const.js';

const siteFooterElement = document.querySelector('.footer');
const body = document.querySelector('body');

export default class PopupPresentor {

  #film = null;

  #popupComponent = null;
  #changeData = null;
  #onClose = null;
  #commentsModel = null;

  constructor (changeData, commentsModel, onClose) {
    this.#changeData = changeData;
    this.#commentsModel = commentsModel;
    this.#onClose = onClose;
  }

  get comments() {
    // console.log(this.#commentsModel)
    // return this.#commentsModel.comments;

    return this.#film.comments.map((commentId) => {
      const tmp = this.#commentsModel.getComments(commentId);
      // console.log('comment:', tmp, 'commentId:', commentId);
      return tmp;
    });
    // [{commentId: 1, ...}, {commentId: 2, ...}]
    // return this.#commentsModel.comments;
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

    if (prevPopupComponent) {
      console.log('comments:', this.comments);
    }

    this.#popupComponent = new PopupView(film, this.comments);
    console.log(this.#film.comments)
    console.log(this.#commentsModel)

    this.#popupComponent.setPopupFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setPopupWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupComponent.setPopupAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#popupComponent.setCommentDeleteClickHandler(this.#handleCommentDeleteClick);
    this.#popupComponent.setCommentAddHandler(this.#handleCommentAdd);

    this.#popupComponent.setPopupCloseClickHandler(()=> {
      this.#onClose();
    });

    document.addEventListener('keydown', onEscKeyDown);
    body.classList.add('hide-overflow');

    if (prevPopupComponent === null) {
      render(this.#popupComponent, siteFooterElement, 'afterend');

      return;
    } else {
      // prevPopupComponent.updateComments(this.comments);
    }

    if (body.contains(prevPopupComponent.element)){
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevPopupComponent);
  };

  destroy = () => {
    remove(this.#popupComponent);
  };

  #handleCommentAdd = (update) => {
    console.log('handleCommentAdd:update:', update);
    // update — объект содержащий комментарий
    this.#changeData(UserAction.ADD_COMMENT, UpdateType.PATCH, update);
  };

  #handleCommentDeleteClick = (update) => {
    console.log('update:', update);
    this.#changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, update);
  };

  #handleFavoriteClick = () => {
    const newFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite
      }
    };
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, newFilm);
  };

  #handleWatchlistClick = () => {
    const newFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist
      }
    };
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, newFilm);
  };

  #handleAlreadyWatchedClick = () => {
    const newFilm = {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched
      }
    };
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, newFilm);
  };

}
