import UserTitleView from './view/user-title-view.js';
// import SortView from './view/sort-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';
import NavigationModel from './model/navigation-model.js';
import NavigationPresentor from './presenter/navigation-presentor.js';

import { render } from './framework/render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const moviesModel = new MoviesModel();
const filterModel = new NavigationModel();
const filmsPresenter = new FilmsPresenter(siteMainElement, moviesModel, filterModel);
const navigationPresenter = new NavigationPresentor(siteMainElement, filterModel, moviesModel);


render(new UserTitleView(), siteHeaderElement);
navigationPresenter.init();
filmsPresenter.init();
