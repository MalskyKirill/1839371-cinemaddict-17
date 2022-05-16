import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsListTitleView from '../view/films-list-title.js';
//import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
//import PopupPresentor from './popup-presentor.js';
import NoFilmView from '../view/no-film-view.js';

import FilmPresentor from './film-presentor.js';

import { render, remove } from '../framework/render.js';

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

  #handleShowMoreButtonClick = () => {

    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderFilm = (film) => {
    // const filmCardComponent = new FilmCardView(film);

    // render(filmCardComponent, this.#filmsListConteinerComponent.element);

    const filmPresenter = new FilmPresentor();
    filmPresenter.init(film);

    // filmCardComponent.setPopupOpenClickHandler(() => {
    //   this.#popupPresentor = new PopupPresentor();
    //   this.#popupPresentor.init(film);
    // });
  };

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  };

  #renderNoFilms = () => {
    render(new NoFilmView(), this.#filmsComponent.element);
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
  };

  #renderFilmListTitle = () => {
    render(new FilmsListTitleView, this.#filmsListComponent.element);
  };

  #renderFilmsListConteiner = () => {
    render(this.#filmsListConteinerComponent, this.#filmsListComponent.element);
  };

  #renderFilmList = () => {
    render(this.#filmsListComponent, this.#filmsComponent.element);
    this.#renderFilmListTitle();
    this.#renderFilmsListConteiner();

    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    if (this.#films.length > FILM_COUNT_PER_STEP){
      this.#renderShowMoreButton();
    }
  };

  #renderFilmsBoard = () => {

    render(this.#filmsComponent, this.#filmsContainer);
    if (this.#films.every((film) => film.length === 0)) {
      this.#renderNoFilms();
    } else {
      this.#renderFilmList();
    }
  };
}
