import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortTemplate = () => (`<ul class="sort">
                                        <li><a href="#" class="sort__button" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
                                        <li><a href="#" class="sort__button" data-sort-type="${SortType.SORRT_BY_DATE}">Sort by date</a></li>
                                        <li><a href="#" class="sort__button" data-sort-type="${SortType.SORT_BY_RATING}">Sort by rating</a></li>
                                      </ul>`);

export default class SortView extends AbstractView{

  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);

  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    this.element.querySelectorAll('li').forEach((el) => el.addEventListener('click', () => {
      this.element.classList.toggle('sort__button--active');
    }));

    evt.preventDefault();

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

}

