import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsListTitleView from '../view/films-list-title.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import NoFilmView from '../view/no-film-view.js';

import FilmPresentor from './film-presentor.js';

import { render, remove, RenderPosition } from '../framework/render.js';
//import { updateItem } from '../utils/common.js';
import SortView from '../view/sort-view.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import {sortFilmByDate, sortFilmByRating} from '../utils/film.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #filmsContainer = null;
  #moviesModel = null;
  #currentSortType = SortType.DEFAULT;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListConteinerComponent = new FilmsListContainerView();
  #noFilmComponent = new NoFilmView();
  #showMoreButtonComponent = null;
  #sortComponent = null;

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPresentor = new Map();

  constructor(filmsContainer, moviesModel) {
    this.#filmsContainer = filmsContainer;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    switch (this.#currentSortType) {
      case SortType.SORRT_BY_DATE:
        return [...this.#moviesModel.movies].sort(sortFilmByDate);
      case SortType.SORT_BY_RATING:
        return [...this.#moviesModel.movies].sort(sortFilmByRating);
    }

    return this.#moviesModel.movies;
  }

  init = () => {

    this.#renderFilmsBoard();

  };


  #handleShowMoreButtonClick = () => {

    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount += FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderFilm(films);
    this.#renderedFilmCount = newRenderedFilmCount;


    if (this.#renderedFilmCount >= filmCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    switch(actionType) {
      case UserAction.UPDATE_FILM:
        this.#moviesModel.updateFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#filmPresentor.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearFilmsBoard();
        this.#renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmsBoard({resetRenderedFilmCount: true, resetSortType: true});
        this.#renderFilmsBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmsBoard({resetRenderedFilmCount: true});
    this.#renderFilmsBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#filmsComponent.element, RenderPosition.AFTERBEGIN);
  };


  #renderFilm = (film) => {
    const filmPresenter = new FilmPresentor(this.#filmsListConteinerComponent.element, this.#handleViewAction, this.#onPopupOpen);
    filmPresenter.init(film);
    this.#filmPresentor.set(film.id, filmPresenter);
  };

  #onPopupOpen = () => {
    this.#filmPresentor.forEach((presenter) => presenter.closePopup());
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #renderNoFilms = () => {
    render(this.#noFilmComponent, this.#filmsComponent.element);
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);

    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
  };

  #renderFilmListTitle = () => {
    render(new FilmsListTitleView, this.#filmsListComponent.element);
  };

  #renderFilmsListConteiner = () => {
    render(this.#filmsListConteinerComponent, this.#filmsListComponent.element);
  };

  #clearFilmList = () => {
    this.#filmPresentor.forEach((presenter) => presenter.destroy());
    this.#filmPresentor.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #renderFilmList = () => {
    const filmCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));

    render(this.#filmsListComponent, this.#filmsComponent.element);
    this.#renderFilmListTitle();
    this.#renderFilmsListConteiner();

    this.#renderFilms(films);

    if (filmCount > FILM_COUNT_PER_STEP){
      this.#renderShowMoreButton();
    }
  };

  #clearFilmsBoard = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    this.#filmPresentor.forEach((presenter) => presenter.destroy());
    this.#filmPresentor.clear();

    remove(this.#sortComponent);
    remove(this.#noFilmComponent);
    remove(this.#showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderFilmsBoard = () => {
    const films = this.films;
    const filmCount = films.length;

    this.#renderSort();

    render(this.#filmsComponent, this.#filmsContainer);

    if (filmCount === 0 ) {
      this.#renderNoFilms();
    } else {
      render(this.#filmsListComponent, this.#filmsComponent.element);
      this.#renderFilmListTitle();
      this.#renderFilmsListConteiner();
      this.#renderFilms(films.slice(0, Math.min(filmCount, this.#renderedFilmCount)));
    }

    if (filmCount > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }
  };
}
