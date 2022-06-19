import AbstractView from '../framework/view/abstract-view.js';

const createNavigationItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (`<a href="${name}"
              class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}" value="${type}">
                ${name}

                <span class="main-navigation__item-count">${count}</span>
          </a>`);
};

const createNavigationTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createNavigationItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
    ${filterItemsTemplate}
  </nav>`;
};


export default class NavigationView extends AbstractView{

  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createNavigationTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.getAttribute('value'));
  };
}
