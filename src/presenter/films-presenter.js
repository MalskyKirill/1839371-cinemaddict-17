import { nanoid } from 'nanoid';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsListTitleView from '../view/films-list-title.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import NoFilmView from '../view/no-film-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import FilmPresentor from './film-presentor.js';

import { render, remove, RenderPosition } from '../framework/render.js';
import { filter } from '../utils/filter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import {sortFilmByDate, sortFilmByRating} from '../utils/film.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #filmsContainer = null;
  #moviesModel = null;
  #commentsModel = null;
  #currentSortType = SortType.DEFAULT;
  #filterModel = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListConteinerComponent = new FilmsListContainerView();
  #loadingComponent = new LoadingView();
  #noFilmComponent = null;
  #showMoreButtonComponent = null;
  #sortComponent = null;

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPresentor = new Map();
  #filterType = FilterType.ALL_MOVIES;
  #isLoading = true;

  constructor(filmsContainer, moviesModel, commentsModel, filterModel) {
    this.#filmsContainer = filmsContainer;
    this.#moviesModel = moviesModel;
    this.#filterModel = filterModel;
    this.#commentsModel = commentsModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#moviesModel.movies;
    const filteredFilms = filter[this.#filterType](films);


    switch (this.#currentSortType) {
      case SortType.SORRT_BY_DATE:
        return filteredFilms.sort(sortFilmByDate);
      case SortType.SORT_BY_RATING:
        return filteredFilms.sort(sortFilmByRating);
    }

    return filteredFilms;
  }

  init = () => {

    this.#renderFilmsBoard();

  };


  #handleShowMoreButtonClick = () => {

    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderFilms(films);
    this.#renderedFilmCount = newRenderedFilmCount;


    if (this.#renderedFilmCount >= filmCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log('handleViewAction:', actionType, updateType, update);
    switch(actionType) {
      case UserAction.UPDATE_FILM:
        this.#moviesModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        // {filmId, commentId}
        this.#commentsModel.deleteComment(updateType, update.commentId);
        this.#moviesModel.deleteComment(updateType, update.filmId, update.commentId);
        break;
      case UserAction.ADD_COMMENT: {
        const commentId = nanoid();
        this.#commentsModel.addComment(updateType, {...update, commentId });
        this.#moviesModel.addComment(updateType, { ...update, commentId });
        break;
      }
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
    const filmPresenter = new FilmPresentor(this.#filmsListConteinerComponent.element, this.#handleViewAction, this.#commentsModel, this.#onPopupOpen);
    filmPresenter.init(film);
    this.#filmPresentor.set(film.id, filmPresenter);
  };

  #onPopupOpen = () => {
    this.#filmPresentor.forEach((presenter) => presenter.closePopup());
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#filmsComponent.element);
  }

  #renderNoFilms = () => {
    this.#noFilmComponent = new NoFilmView(this.#filterType);
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

  #clearFilmsBoard = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    this.#filmPresentor.forEach((presenter) => presenter.destroy());
    this.#filmPresentor.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#showMoreButtonComponent);

    if (this.#noFilmComponent) {
      remove(this.#noFilmComponent);
    }

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
    render(this.#filmsComponent, this.#filmsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const films = this.films;
    const filmCount = films.length;

    this.#renderSort();

    //render(this.#filmsComponent, this.#filmsContainer);

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
