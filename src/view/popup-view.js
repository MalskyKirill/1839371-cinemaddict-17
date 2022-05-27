import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeFilmReleaseDate, humanizeCommentDate } from '../utils/film.js';
import { getTimeFromMins } from '../utils/common.js';


const createCommentsTemplate = (comments) => {

  let str = '';

  for(let i = 0; i < comments.length; i++) {

    const date = humanizeCommentDate(comments[i].date);
    str += `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comments[i].emotion}.png" width="55" height="55" alt="emoji-${comments[i].emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comments[i].comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comments[i].author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
     `;
  }
  return str;
};

const createEmojiTemplate = (isEmotion) => isEmotion ? `<img src="./images/emoji/${isEmotion}.png" width="50" height="50" alt="emoji-${isEmotion}">` : '';

const createCommentTemplate = (comment) => comment ? comment : '';

const createPopupTemplate = (data) => {
  const {filmInfo, comments, comment, userDetails, isEmotion} = data;
  const date = humanizeFilmReleaseDate(filmInfo.release.date);
  const time = getTimeFromMins(filmInfo.runtime);
  //console.log(data.comments.comment)

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
                      <span class="film-details__genre">${filmInfo.genre}</span>
                      <span class="film-details__genre">${filmInfo.genre}</span>
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
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

              <ul class="film-details__comments-list">
                ${createCommentsTemplate(comments)}
              </ul>

              <div class="film-details__new-comment">
                <div class="film-details__add-emoji-label">${createEmojiTemplate(isEmotion)}</div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${createCommentTemplate(comment)}</textarea>
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
    this._state = PopupView.parseFilmToState(film);
    this.#setInnerHandlers();
  }



  get template() {
    return createPopupTemplate(this._state);

  }

  setPopupCloseClickHandler = (callback) => {
    this._callback.popupCloseClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupCloseClickHandler);

  };

  setPopupFavoriteClickHandler = (callback) => {
    console.log(this.element)

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

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setPopupCloseClickHandler(this._callback.popupCloseClick);
    this.setPopupFavoriteClickHandler(this._callback.favoriteClick);
    this.setPopupAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setPopupWatchlistClickHandler(this._callback.watchlistClick);
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((el) => {
      el.addEventListener('click', this.#emojiItemClickHandler);
    });

    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#descriptionInputHandler);
  };

  // #scroll = () => {
  //   const scroll = this.element.scrollTop;
  //   this.element.scrollTo(0, scroll);
  // };

  #emojiItemClickHandler = (evt) => {
    evt.preventDefault();
    const scroll = this.element.scrollTop;
    this.updateElement ({
      isEmotion: evt.target.value,
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
    const scroll = this.element.scrollTop;
    // console.log(this.element.scrollTop)

    this._callback.favoriteClick();
    this.element.scrollTo(0, scroll);
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

  static parseFilmToState = (film) => ({...film,
    isEmotion: film.comments.emotion === null,
  });

  static parseStateToFilm = (state) => {
    const film = {...state};

    if (!film.comments.isEmotion) {
      film.comments.isEmotion = null;
    }

    delete film.comments.isEmotion;

    return film;
  };

}

