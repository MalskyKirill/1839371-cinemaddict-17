import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsListTitleView from '../view/films-list-title.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import PopupPresentor from './popup-presentor.js';
import NoFilmView from '../view/no-film-view.js';

import { render } from '../framework/render.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #filmsContainer = null;
  #moviesModel = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListConteinerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #popupPresentor = null;

  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor(filmsContainer, moviesModel) {
    this.#filmsContainer = filmsContainer;
    this.#moviesModel = moviesModel;
  }

  init = () => {

    this.#films = [...this.#moviesModel.movies];

    this.#renderFilmsBoard();

  };

  #handleshowMoreButtonClick = () => {

    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilm = (film) => {
    const filmCardComponent = new FilmCardView(film);

    render(filmCardComponent, this.#filmsListConteinerComponent.element);

    filmCardComponent.setPopupOpenClickHandler(() => {
      this.#popupPresentor = new PopupPresentor();
      this.#popupPresentor.init(film);
    });
  };

  #renderFilmsBoard = () => {

    render(this.#filmsComponent, this.#filmsContainer);
    if (this.#films.every((film) => film.length === 0)) {
      render(new NoFilmView(), this.#filmsComponent.element);
    } else {

      render(this.#filmsListComponent, this.#filmsComponent.element);
      render(new FilmsListTitleView, this.#filmsListComponent.element);
      render(this.#filmsListConteinerComponent, this.#filmsListComponent.element);

      for (let i = 0; i < Math.min(this.#films.length, FILM_COUNT_PER_STEP); i++) {
        this.#renderFilm(this.#films[i]);
      }

      if (this.#films.length > FILM_COUNT_PER_STEP){
        render(this.#showMoreButtonComponent, this.#filmsListComponent.element);

        this.#showMoreButtonComponent.setClickHandler(this.#handleshowMoreButtonClick);
      }
    }
  };
}
