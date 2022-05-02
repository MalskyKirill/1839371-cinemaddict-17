import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeFilmDueDate = (dueDate) => dayjs(dueDate).format('YYYY');
const humanizeFilmReleaseDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');

//const isMovieWatchlist = (watchlist) => Object.values(watchlist).some(Boolean);

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};

export {getRandomInteger, humanizeFilmDueDate, humanizeFilmReleaseDate, getTimeFromMins};
