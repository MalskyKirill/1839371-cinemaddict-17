import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsListTitleView from '../view/films-list-title.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-view.js';
import PopupPresentor from './popup-presentor.js';
import { render } from '../render.js';

const popupPresentor = new PopupPresentor();

export default class FilmsPresenter {
  #filmsContainer = null;
  #moviesModel = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListConteinerComponent = new FilmsListContainerView();

  #filmsMovies = [];

  init = (filmsContainer, moviesModel) => {
    this.#filmsContainer = filmsContainer;
    this.#moviesModel = moviesModel;
    this.#filmsMovies = [...this.#moviesModel.movies];

    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(new FilmsListTitleView, this.#filmsListComponent.element);
    render(this.#filmsListConteinerComponent, this.#filmsListComponent.element);

    for (let i = 0; i < this.#filmsMovies.length; i++) {
      this.#renderFilm(this.#filmsMovies[i]);
    }

    render(new ShowMoreButtonView(), this.#filmsListComponent.element);

    // popupPresentor.init(moviesModel);

  };

  #renderFilm= (film) => {
    const filmCardComponent = new FilmCardView(film);
    


    render(filmCardComponent, this.#filmsListConteinerComponent.element);
  };
}
