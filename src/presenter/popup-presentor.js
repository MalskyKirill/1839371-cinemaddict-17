import PopupView from '../view/popup-view.js';
import { render, remove, replace } from '../framework/render.js';
import { UpdateType, UserAction, END_POINT, AUTHORIZATION } from '../const.js';
import CommnetsModel from '../model/comments-model.js';
import CommentsApiService from '../comments-api-service.js';

const siteFooterElement = document.querySelector('.footer');
const body = document.querySelector('body');

export default class PopupPresentor {

  #film = null;

  #popupComponent = null;
  #changeData = null;
  #onClose = null;
  #commentsModel = null;

  constructor (changeData, onClose) {
    this.#changeData = changeData;
    this.#commentsModel = new CommnetsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#onClose = onClose;
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  init = (film, shouldRender) => {
    this.#film = film;

    if (shouldRender) {
      this.#commentsModel.init(film.id);
      this.#renderPopup();
    } else {
      this.#popupComponent.update(film, this.comments);
    }
  };

  #renderPopup() {
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        body.classList.remove('hide-overflow');
        remove(this.#popupComponent );
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const prevPopupComponent = this.#popupComponent;

    this.#popupComponent = new PopupView(this.#film);
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

      // return;
    }
    // } else {
    //   // prevPopupComponent.updateComments(this.comments);
    // }

    // if (body.contains(prevPopupComponent.element)){
    //   replace(this.#popupComponent, prevPopupComponent);
    // }

    // remove(prevPopupComponent);
  }

  destroy = () => {
    remove(this.#popupComponent);
    this.#popupComponent = null;
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.DELETE_COMMENT:
        await this.#commentsModel.deleteComment(updateType, update.commentId);
        break;
      case UserAction.ADD_COMMENT: {
        await this.#commentsModel.addComment(updateType, update);
        break;
      }
    }
  };

  #handleModelEvent = (updateType, data) => {
    this.#popupComponent.updateComments(this.comments);
    // switch(updateType) {
    //   case UpdateType.INIT:
    // }
  };

  #handleCommentAdd = async (update) => {
    console.log('handleCommentAdd:update:', update);
    // update — объект содержащий комментарий
    // блокируем, меняем надписи
    await this.#handleViewAction(UserAction.ADD_COMMENT, UpdateType.PATCH, update);
    // разблокирует, ...
    this.#changeData(UserAction.ADD_COMMENT, UpdateType.PATCH, update);
  };

  #handleCommentDeleteClick = async (update) => {
    console.log('update:', update);
    await this.#handleViewAction(UserAction.DELETE_COMMENT, UpdateType.PATCH, update);
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
