import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmsListTitleView from '../view/films-list-title.js';
import FilmCardView from '../view/film-card-view.js';
import NewShowMoreButtonView from '../view/show-more-view.js';

import { render } from '../render.js';

export default class FilmsPresenter {
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmsListView();
  filmsListConteinerComponent = new FilmsListContainerView();

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    render(this.filmsComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(new FilmsListTitleView, this.filmsListComponent.getElement());
    render(this.filmsListConteinerComponent, this.filmsListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmsListConteinerComponent.getElement());
    }

    render(new NewShowMoreButtonView(), this.filmsListComponent.getElement());
  };
}
