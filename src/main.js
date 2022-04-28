import newUserTitleView from './view/user-title-view.js';
import newNavigationView from './view/navigation-view.js';
import NewSortView from './view/sort-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import PopupView from './view/popup-view.js';


import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(new newUserTitleView(), siteHeaderElement);
render(new newNavigationView(), siteMainElement);
render(new NewSortView(), siteMainElement);

const filmsPresenter = new FilmsPresenter();
filmsPresenter.init(siteMainElement);

render(new PopupView(), siteFooterElement, 'afterend');
