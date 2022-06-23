import he from 'he';
import { nanoid } from 'nanoid';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeFilmReleaseDate, humanizeCommentDate } from '../utils/film.js';
import { getTimeFromMins } from '../utils/common.js';


const createCommentsTemplate = (comments, isDisabled, isDeleting) => {
  let str = '';

  for(let i = 0; i < comments.length; i++) {

    const date = humanizeCommentDate(comments[i].date);
    str += `
    <li class="film-details__comment" id="comment-${comments[i].id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comments[i].emotion}.png" width="55" height="55" alt="emoji-${comments[i].emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comments[i].comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comments[i].author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button id="${comments[i].id}" class="film-details__comment-delete" ${isDisabled ? 'disabled' : ''}>
            ${isDeleting ? 'Deleteing' : 'Delete'}
          </button>
        </p>
      </div>
    </li>
     `;
  }
  return str;
};

const createEmojiTemplate = (emotion) => emotion ? `<img src="./images/emoji/${emotion}.png" width="50" height="50" alt="emoji-${emotion}">` : '';

const createCommentTemplate = (comment) => comment ? comment : '';

const createPopupTemplate = (data) => {
  const {filmInfo, comment, userDetails, emotion, commentsList, isDisabled, isDeleting, isAdding } = data;
  const date = humanizeFilmReleaseDate(filmInfo.release.date);
  const time = getTimeFromMins(filmInfo.runtime);

  const alreadyWatched = userDetails.alreadyWatched
    ? 'film-details__control-button--active'
    : '';

  const watchlist = userDetails.watchlist
    ? 'film-details__control-button--active'
    : '';

  const favorite = userDetails.favorite
    ? 'film-details__control-button--active'
    : '';

  return (
    `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="film-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

                <p class="film-details__age">${filmInfo.ageRating}</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${filmInfo.title}</h3>
                    <p class="film-details__title-original">Original: ${filmInfo.title}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${filmInfo.totalRating}</p>
                  </div>
                </div>

                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${filmInfo.director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${filmInfo.writers}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${filmInfo.actors}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${date}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${time}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genres</td>
                    <td class="film-details__cell">
                      <span class="film-details__genre">${filmInfo.genre}</span></td>
                  </tr>
                </table>
                <p class="film-details__film-description">
                  ${filmInfo.description}
                </p>
              </div>
            </div>

            <section class="film-details__controls">
              <button type="button" class="film-details__control-button ${watchlist} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
              <button type="button" class="film-details__control-button ${alreadyWatched} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
              <button type="button" class="film-details__control-button ${favorite} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
            </section>
          </div>

          <div class="film-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsList.length}</span></h3>

              <ul class="film-details__comments-list">
                ${createCommentsTemplate(commentsList, isDisabled, isDeleting, isAdding)}
              </ul>

              <div class="film-details__new-comment">
                <div class="film-details__add-emoji-label">${createEmojiTemplate(emotion)}</div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" maxlength="140" ${isDisabled ? 'disabled' : ''}>${createCommentTemplate(comment)}</textarea>
                </label>

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                  <label class="film-details__emoji-label" for="emoji-puke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>`
  );
};

export default class PopupView extends AbstractStatefulView{
  constructor(film){
    super();
    this._state = PopupView.parseFilmToState(film, []);
    this.#setInnerHandlers();
  }

  get template() {
    return createPopupTemplate(this._state);
  }

  shakeComment(commentId, callback) {
    const commentElement = this.element.querySelector(`#comment-${commentId}`);
    this.shake(commentElement, callback);
  }

  shakeForm(callback) {
    const commentForm = this.element.querySelector('.film-details__new-comment');
    this.shake(commentForm, callback);
  }

  update(film, commentsList) {
    const state = PopupView.parseFilmToState(film, commentsList);
    this.updateElement(state);
  }

  updateComments(commentsList) {
    this.updateElement({ commentsList });
  }

  setPopupCloseClickHandler = (callback) => {
    this._callback.popupCloseClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupCloseClickHandler);
  };

  setPopupFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);

  };

  setPopupAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setPopupWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  setCommentDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelectorAll('.film-details__comment-delete').forEach((el) => el.addEventListener('click', this.#formCommentDeleteClickHandler));
  };

  setCommentAddHandler = (callback) => {
    this._callback.addComment = callback;
    this.element.querySelector('.film-details__comment-input').addEventListener('keyup', this.#addCommentHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setPopupCloseClickHandler(this._callback.popupCloseClick);
    this.setPopupFavoriteClickHandler(this._callback.favoriteClick);
    this.setPopupAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setPopupWatchlistClickHandler(this._callback.watchlistClick);
    this.setCommentDeleteClickHandler(this._callback.deleteClick);
    this.setCommentAddHandler(this._callback.addComment);
  };

  #addCommentHandler = (evt) => {
    if (evt.code === 'Enter' && evt.ctrlKey) {
      const commentId = nanoid();
      this._callback.addComment({
        commentId,
        filmId: this._state.id,
        emotion: this._state.emotion,
        comment: he.encode(evt.target.value)
      });
      this.updateElement({
        emotion: '',
        comment: ''
      });
    }
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((el) => {
      el.addEventListener('click', this.#emojiItemClickHandler);
    });

    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#descriptionInputHandler);
  };

  #emojiItemClickHandler = (evt) => {
    evt.preventDefault();
    const scroll = this.element.scrollTop;
    this.updateElement ({
      emotion: evt.target.value,
    });
    this.element.scrollTo(0, scroll);
  };

  #descriptionInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      comment: evt.target.value,
    });
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  #popupCloseClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupCloseClick(PopupView.parseStateToFilm(this._state));
  };

  #formCommentDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick({ filmId: this._state.id, commentId: evt.target.id });
  };

  static parseFilmToState = (film, commentsList) => ({
    ...film,
    isEmotion: film.comments.emotion === null,
    commentsList,
    isDisabled: false,
    isDeleting: false,
    isAdding: false,
  });

  static parseStateToFilm = (state) => {
    const film = {...state};

    if (!film.comments.isEmotion) {
      film.comments.isEmotion = null;
    }

    delete film.comments.isEmotion;
    delete film.comments.isDisabled;
    delete film.comments.isDeleting;

    return film;
  };

}

