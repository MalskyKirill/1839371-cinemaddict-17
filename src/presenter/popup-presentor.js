import PopupView from '../view/popup-view';
import { render } from '../render';

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
        popup.element.remove();
        document.removeEventListener('keydown', onEscKeyDown);
        body.classList.remove('hide-overflow');
      }
    };

    render(popup, siteFooterElement, 'afterend');

    body.classList.add('hide-overflow');

    popup.element.querySelector('.film-details__close-btn').addEventListener('click', ()=> {
      popup.element.remove();
      document.removeEventListener('keydown', onEscKeyDown);
      body.classList.remove('hide-overflow');
    });

    document.addEventListener('keydown', onEscKeyDown);

  };

}
