import UserTitleView from './view/user-title-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';
import CommnetsModel from './model/comments-model.js';
import NavigationModel from './model/navigation-model.js';
import NavigationPresentor from './presenter/navigation-presentor.js';
import MoviesApiService from './movies-api-service.js';

import { render } from './framework/render.js';
import CommentsModel from './model/comments-model.js';

const AUTHORIZATION = 'Basic er234kdzbdw';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict/';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

//const moviesModel = new MoviesModel();
const moviesModel = new MoviesModel(new MoviesApiService(END_POINT, AUTHORIZATION));
const filterModel = new NavigationModel();
const commnetsModel = new CommnetsModel();
const filmsPresenter = new FilmsPresenter(siteMainElement, moviesModel, commnetsModel, filterModel);
const navigationPresenter = new NavigationPresentor(siteMainElement, filterModel, moviesModel);


moviesModel.init();
commnetsModel.init();
render(new UserTitleView(), siteHeaderElement);
navigationPresenter.init();
filmsPresenter.init();

