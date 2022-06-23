import AbstractView from '../framework/view/abstract-view.js';
import { UserStatus } from '../const.js';

const createUserTitleTemplate = (userStatus) =>   (`<section class="header__profile profile">
                                              <p class="profile__rating">${userStatus}</p>
                                              <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
                                            </section>`);

export default class UserTitleView extends AbstractView {

  #whathedFilms = 0;

  constructor(whathedFilms) {
    super();
    this.#whathedFilms = whathedFilms;
  }

  #caclulateUserStatus() {
    if (this.#whathedFilms === 0) {
      return '';
    }

    if (this.#whathedFilms >= 1 && this.#whathedFilms <= 10) {
      return UserStatus.NOVICE;
    }

    if (this.#whathedFilms >= 11 && this.#whathedFilms <= 20) {
      return UserStatus.FAN;
    }

    return UserStatus.MOVIE_BUFF;
  }

  get template() {
    const userStatus = this.#caclulateUserStatus();

    return createUserTitleTemplate(userStatus);
  }

}
