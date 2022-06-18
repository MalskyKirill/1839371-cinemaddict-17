import UserTitleView from './view/user-title-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';
import NavigationModel from './model/navigation-model.js';
import NavigationPresentor from './presenter/navigation-presentor.js';
import MoviesApiService from './movies-api-service.js';
import { END_POINT, AUTHORIZATION } from './const.js';
import { render } from './framework/render.js';




const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const moviesModel = new MoviesModel(new MoviesApiService(END_POINT, AUTHORIZATION));
const filterModel = new NavigationModel();
// const commnetsModel = new CommnetsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filmsPresenter = new FilmsPresenter(siteMainElement, moviesModel, filterModel);
const navigationPresenter = new NavigationPresentor(siteMainElement, filterModel, moviesModel);


moviesModel.init();
// commnetsModel.init();
render(new UserTitleView(), siteHeaderElement);
navigationPresenter.init();
filmsPresenter.init();

