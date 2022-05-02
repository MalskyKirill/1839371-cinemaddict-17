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
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmsListView();
  filmsListConteinerComponent = new FilmsListContainerView();

  init = (filmsContainer, moviesModel) => {
    this.filmsContainer = filmsContainer;
    this.moviesModel = moviesModel;
    this.filmsMovies = [...this.moviesModel.getMovies()];

    render(this.filmsComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(new FilmsListTitleView, this.filmsListComponent.getElement());
    render(this.filmsListConteinerComponent, this.filmsListComponent.getElement());

    for (let i = 0; i < this.filmsMovies.length; i++) {
      render(new FilmCardView(this.filmsMovies[i]), this.filmsListConteinerComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmsListComponent.getElement());

    popupPresentor.init(moviesModel);
  };
}
