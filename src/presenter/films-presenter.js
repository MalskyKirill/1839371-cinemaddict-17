import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsListTitleView from '../view/films-list-title.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import NoFilmView from '../view/no-film-view.js';

import FilmPresentor from './film-presentor.js';

import { render, remove, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import SortView from '../view/sort-view.js';
import { SortType } from '../const.js';
import {sortFilmByDate} from '../utils/film.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #filmsContainer = null;
  #moviesModel = null;
  #currentSortType = SortType.DEFAULT;
  #sourcedFilm = [];

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListConteinerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #sortComponent = new SortView();

  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPresentor = new Map();

  constructor(filmsContainer, moviesModel) {
    this.#filmsContainer = filmsContainer;
    this.#moviesModel = moviesModel;
  }

  init = () => {

    this.#films = [...this.#moviesModel.movies];
    this.#sourcedFilm = [...this.#moviesModel.movies];

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
    this.#sourcedFilm = updateItem(this.#sourcedFilm, updateFilm);
    this.#filmPresentor.get(updateFilm.id).init(updateFilm);
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.SORRT_BY_DATE:
        this.#films.sort(sortFilmByDate);
        break;
      // case SortType.SORT_BY_RATING:
      //   this.#films.sort(sortFilmByRating);
      //   break;
      default:
        this.#films = [...this.#sourcedFilm];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);

    this.#clearFilmList();
    this.#renderFilmList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#filmsComponent.element, RenderPosition.AFTERBEGIN);

    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };


  #renderFilm = (film) => {
    const filmPresenter = new FilmPresentor(this.#filmsListConteinerComponent.element, this.#handleFilmChange, this.#onPopupOpen);
    filmPresenter.init(film);
    this.#filmPresentor.set(film.id, filmPresenter);
  };

  #onPopupOpen = () => {
    this.#filmPresentor.forEach((presenter) => presenter.closePopup());
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

  #clearFilmList = () => {
    this.#filmPresentor.forEach((presenter) => presenter.destroy())
    this.#filmPresentor.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
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

    this.#renderSort();

    render(this.#filmsComponent, this.#filmsContainer);
    if (this.#films.length === 0 ) {
      this.#renderNoFilms();
    } else {
      this.#renderFilmList();
    }
  };
}
