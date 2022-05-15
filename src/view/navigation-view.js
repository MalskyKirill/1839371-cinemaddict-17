import AbstractView from '../framework/view/abstract-view.js';

const createNavigationItemTemplate = (filter, isActive) => {
  const {name, count} = filter;

  return (`<a href="${name}"
              class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}">
                ${name}
                <span class="main-navigation__item-count">${count}</span>
          </a>`);
};

const createNavigationTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createNavigationItemTemplate(filter))
    .join('');

  return `<nav class="main-navigation">
    ${filterItemsTemplate}
  </nav>`;
};


export default class NavigationView extends AbstractView{

  #filters = null;
  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createNavigationTemplate(this.#filters);
  }

}

