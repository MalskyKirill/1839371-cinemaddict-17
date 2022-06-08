import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortTemplate = (currentSortType) => (`<ul class="sort">
                                        <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
                                        <li><a href="#" class="sort__button ${currentSortType === SortType.SORRT_BY_DATE ? 'sort__button--active' : ''}" data-sort-type="${SortType.SORRT_BY_DATE}">Sort by date</a></li>
                                        <li><a href="#" class="sort__button ${currentSortType === SortType.SORT_BY_RATING ? 'sort__button--active' : ''}" data-sort-type="${SortType.SORT_BY_RATING}">Sort by rating</a></li>
                                      </ul>`);

export default class SortView extends AbstractView{
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);

  };

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'A') {
      return;
    }

    this.element.querySelectorAll('li > a').forEach((el) =>  {
      el.classList.remove('sort__button--active');
    });

    evt.target.classList.add('sort__button--active');

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

}

