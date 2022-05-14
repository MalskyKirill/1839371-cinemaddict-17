import { FilterType } from '../const.js';

const filter = {
  [FilterType.ALL_MOVIES]: (films) => films.filter((film) => !film.isAll),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
};

export {filter};
