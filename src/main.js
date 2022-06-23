import UserTitleView from './view/user-title-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';
import NavigationModel from './model/navigation-model.js';
import NavigationPresenter from './presenter/navigation-presenter.js';
import MoviesApiService from './movies-api-service.js';
import { END_POINT, AUTHORIZATION, FilterType } from './const.js';
import { render, replace } from './framework/render.js';
import { filter } from './utils/filter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const moviesModel = new MoviesModel(new MoviesApiService(END_POINT, AUTHORIZATION));
const filterModel = new NavigationModel();
const filmsPresenter = new FilmsPresenter(siteMainElement, moviesModel, filterModel);
const navigationPresenter = new NavigationPresenter(siteMainElement, filterModel, moviesModel);

let userTitleComponent = new UserTitleView(0);

moviesModel.init();
render(userTitleComponent, siteHeaderElement);
navigationPresenter.init();
filmsPresenter.init();

moviesModel.addObserver(() => {
  const movies = moviesModel.movies;
  const watchedCount = filter[FilterType.HISTORY](movies).length;
  const oldUserTitleComponent = userTitleComponent;
  userTitleComponent = new UserTitleView(watchedCount);

  replace(userTitleComponent, oldUserTitleComponent);
});
