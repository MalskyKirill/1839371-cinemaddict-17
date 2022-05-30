const EMOTION = ['smile', 'sleeping', 'puke', 'angry'];

const FilterType ={
  ALL_MOVIES: 'All movies',
  WATCHLIST: 'Wathlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites'
};

const SortType = {
  DEFAULT: 'default',
  SORRT_BY_DATE: 'sort-by-date',
  SORT_BY_RATING: 'sort-by-rating',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export {EMOTION, FilterType, SortType, UpdateType, UserAction};
