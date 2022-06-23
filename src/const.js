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
  INIT: 'INIT',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UserStatus = {
  NOVICE: 'novice',
  FAN: 'fan',
  MOVIE_BUFF: 'movie buff'
};

const AUTHORIZATION = 'Basic er234kdzbdw';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

export {EMOTION, AUTHORIZATION, END_POINT, FilterType, SortType, UpdateType, UserAction, UserStatus};
