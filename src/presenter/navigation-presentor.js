import NavigationView from '../view/navigation-view.js';

import { render, replace, remove } from '../framework/render.js';
import { filter } from '../utils/filter.js';
import { FilterType, UpdateType } from '../const.js';


export default class NavigationPresentor {
  #filterContainer = null;
  #filterModel = null;
  #moviesModel = null;

  #filterComponent = null;


  constructor(filterContainer, filterModel, moviesModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#handleModalEvent);
    this.#filterModel.addObserver(this.#handleModalEvent);
  }

  get filters() {
    const films = this.#moviesModel.movies;

    return [
      {
        tipe: FilterType.ALL_MOVIES,
        name: 'All movies',
        count: filter[FilterType.ALL_MOVIES](films).length,
      },
      {
        tipe: FilterType.WATCHLIST,
        name: 'Wathlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        tipe: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        tipe: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new NavigationView(filters, this.#filterModel.filters);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);


    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);

  };

  #handleModalEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType){
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

}
