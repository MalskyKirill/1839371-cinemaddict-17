import NavigationView from '../view/navigation-view.js';

import { render } from '../framework/render.js';

const siteMainElement = document.querySelector('.main');


export default class NavigationPresentor {
  #filters = null;

  init = (filters) => {
    this.#filters = filters;

    const navigation = new NavigationView(this.#filters);
    render (navigation, siteMainElement);
  };
}
