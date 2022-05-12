import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListContainerTemplate = () => '<div class="films-list__container"></section>';

export default class FilmsListContainerView extends AbstractView{
  get template() {
    return createFilmsListContainerTemplate();
  }
}
