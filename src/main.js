import UserTitleView from './view/user-title-view.js';
import NavigationView from './view/navigation-view.js';
import SortView from './view/sort-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';
import { generateFilter } from './mock/filter-fish.js';

//import NavigationPresentor from './presenter/navigation-presentor.js';

import { render } from './framework/render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const moviesModel = new MoviesModel();
const filmsPresenter = new FilmsPresenter(siteMainElement, moviesModel);

const filters = generateFilter(moviesModel.movies);

render(new UserTitleView(), siteHeaderElement);
render(new NavigationView(filters), siteMainElement);

render(new SortView(), siteMainElement);

filmsPresenter.init();

