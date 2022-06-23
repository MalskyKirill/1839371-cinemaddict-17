import PopupView from '../view/popup-view.js';
import { render, remove } from '../framework/render.js';
import { UpdateType, UserAction, END_POINT, AUTHORIZATION } from '../const.js';
import CommnetsModel from '../model/comments-model.js';
import CommentsApiService from '../comments-api-service.js';

const siteFooterElement = document.querySelector('.footer');
const body = document.querySelector('body');
const mainElement = document.querySelector('.main');

export default class PopupPresenter {

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
        mainElement.classList.remove('disable-movies-list');
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
    mainElement.classList.add('disable-movies-list');

    if (prevPopupComponent === null) {
      render(this.#popupComponent, siteFooterElement, 'afterend');
    }
  }

  destroy = () => {
    remove(this.#popupComponent);
    this.#popupComponent = null;
  };

  setAdding = () => {
    this.#popupComponent.updateElement({
      isDisabled: true,
      isAdding: true,
    });
  };

  setDeleting = () => {
    this.#popupComponent.updateElement({
      isDisabled: true,
      isDeleting: true,
    });
  };

  #resetFormState = () => {
    this.#popupComponent.updateElement({
      isDisabled: false,
      isDeleting: false,
      isAdding: false,
    });
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.DELETE_COMMENT:
        try {
          this.setDeleting();
          await this.#commentsModel.deleteComment(updateType, update.commentId);
          this.#changeData(actionType, updateType, update);
          this.#resetFormState();
        } catch (error) {
          this.#popupComponent.shakeComment(update.commentId, this.#resetFormState);
        }
        break;
      case UserAction.ADD_COMMENT:
        try {
          this.setAdding();
          await this.#commentsModel.addComment(updateType, update);
          this.#changeData(actionType,updateType, update);
          this.#resetFormState();
        } catch(error) {
          this.#popupComponent.shakeForm(this.#resetFormState);
        }
        break;
    }
  };

  #handleModelEvent = () => {
    this.#popupComponent.updateComments(this.comments);
  };

  #handleCommentAdd = async (update) => {
    await this.#handleViewAction(UserAction.ADD_COMMENT, UpdateType.PATCH, update);
  };

  #handleCommentDeleteClick = async (update) => {

    await this.#handleViewAction(UserAction.DELETE_COMMENT, UpdateType.PATCH, update);
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
