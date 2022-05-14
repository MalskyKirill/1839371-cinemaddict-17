import NavigationView from '../view/navigation-view.js';
import MoviesModel from '../model/movies-model.js';
import { generateFilter } from '../mock/filter-fish.js';

import { render } from '../framework/render.js';

const siteMainElement = document.querySelector('.main');
const moviesModel = new MoviesModel();


export default class NavigationPresentor {
  #filters = null;

  init = (filters) => {
    this.#filters = filters;
    filters = generateFilter(moviesModel.movies);

    const navigation = new NavigationView(this.#filters);
    render (navigation, siteMainElement);
  };
}
// _____________
// import PopupView from '../view/popup-view.js';
// import { render, remove } from '../framework/render.js';

// const siteFooterElement = document.querySelector('.footer');
// const body = document.querySelector('body');

// class PopupPresentor {

//   #movie = null;

//   init = (movie) => {
//     this.#movie = movie;

//     const popup = new PopupView(this.#movie);

//     const onEscKeyDown = (evt) => {
//       if (evt.key === 'Escape' || evt.key === 'Esc') {
//         evt.preventDefault();
//         body.classList.remove('hide-overflow');
//         remove(popup);
//         document.removeEventListener('keydown', onEscKeyDown);
//       }
//     };

//     render(popup, siteFooterElement, 'afterend');

//     body.classList.add('hide-overflow');

//     popup.setPopupCloseClickHandler(()=> {
//       body.classList.remove('hide-overflow');
//       remove(popup);
//       document.removeEventListener('keydown', onEscKeyDown);
//     });

//     document.addEventListener('keydown', onEscKeyDown);

//   };

// }
