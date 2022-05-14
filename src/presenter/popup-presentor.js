import PopupView from '../view/popup-view.js';
import { render, remove } from '../framework/render.js';

const siteFooterElement = document.querySelector('.footer');
const body = document.querySelector('body');

export default class PopupPresentor {

  #movie = null;

  init = (movie) => {
    this.#movie = movie;

    const popup = new PopupView(this.#movie);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        body.classList.remove('hide-overflow');
        remove(popup);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    render(popup, siteFooterElement, 'afterend');

    body.classList.add('hide-overflow');

    popup.setPopupCloseClickHandler(()=> {
      body.classList.remove('hide-overflow');
      remove(popup);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    document.addEventListener('keydown', onEscKeyDown);

  };

}
