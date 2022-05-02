import PopupView from '../view/popup-view';
import { render } from '../render';

const siteFooterElement = document.querySelector('.footer');

export default class PopupPresentor {

  init = (moviesModel) => {
    this.moviesModel = moviesModel;
    this.popupMovies = [...this.moviesModel.getMovies()];

    render(new PopupView(this.popupMovies[0]), siteFooterElement, 'afterend');
  };

}
