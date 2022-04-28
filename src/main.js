import UserTitleView from './view/user-title-view.js';
import NavigationView from './view/navigation-view.js';
import SortView from './view/sort-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import PopupView from './view/popup-view.js';


import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(new UserTitleView(), siteHeaderElement);
render(new NavigationView(), siteMainElement);
render(new SortView(), siteMainElement);

const filmsPresenter = new FilmsPresenter();
filmsPresenter.init(siteMainElement);

render(new PopupView(), siteFooterElement, 'afterend');
