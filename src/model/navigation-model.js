import Observable from '../framework/observable.js';
import { FilterType } from '../const.js';

export default class NavigationModel extends Observable {
  #filter = FilterType.ALL_MOVIES;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
