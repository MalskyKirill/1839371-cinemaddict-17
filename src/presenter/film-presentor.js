import FilmCardView from '../view/film-card-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import { render } from '../framework/render.js';

export default class FilmPresentor {

  #filmComponent = null;
  #filmsListConteinerComponent = null;

  #film = null;

  // constructor (filmsListConteinerComponent) {
  //   this.#filmsListConteinerComponent = filmsListConteinerComponent;
  // }


  init = (film) => {
    this.#film = film;

    this.#filmComponent = new FilmCardView(film);
    this.#filmsListConteinerComponent = new FilmsListContainerView();

    render(this.#filmComponent, this.#filmsListConteinerComponent.element);


  };

}

// const filmCardComponent = new FilmCardView(film);
// this.#renderFilmsListConteiner();

// render(filmCardComponent, this.#filmsListConteinerComponent.element);

// filmCardComponent.setPopupOpenClickHandler(() => {
//   this.#popupPresentor = new PopupPresentor();
//   this.#popupPresentor.init(film);
// });
