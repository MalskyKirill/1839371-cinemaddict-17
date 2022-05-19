import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsListTitleView from '../view/films-list-title.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import NoFilmView from '../view/no-film-view.js';

import FilmPresentor from './film-presentor.js';

import { render, remove } from '../framework/render.js';
import { updateItem } from '../utils/common.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #filmsContainer = null;
  #moviesModel = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListConteinerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPresentor = new Map();

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

  #handleFilmChange = (updateFilm) => {
    this.#films = updateItem(this.#films, updateFilm);
    //console.log(updateFilm)
    this.#filmPresentor.get(updateFilm.id).init(updateFilm);
  };


  #renderFilm = (film) => {
    const filmPresenter = new FilmPresentor(this.#filmsListConteinerComponent.element, this.#handleFilmChange);
    filmPresenter.init(film);
    this.#filmPresentor.set(film.id, filmPresenter);
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

  // #clearFilmList = () => {
  //   this.#filmPresentor.forEach((presenter) => presenter.destroy())
  //   this.#filmPresentor.clear();
  //   this.#renderedFilmCount = FILM_COUNT_PER_STEP;
  //   remove(this.#showMoreButtonComponent);
  // };

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
    if (this.#films.length === 0 ) {
      this.#renderNoFilms();
    } else {
      this.#renderFilmList();
    }
  };
}
