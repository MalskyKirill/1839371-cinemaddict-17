import dayjs from 'dayjs';

const humanizeFilmDueDate = (dueDate) => dayjs(dueDate).format('YYYY');
const humanizeFilmReleaseDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');

//const isMovieWatchlist = (watchlist) => Object.values(watchlist).some(Boolean);

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortFilmByDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.release.date, filmB.release.date);

  return weight ?? dayjs(filmA.release.date).diff(dayjs(filmB.release.date));
};

export {humanizeFilmDueDate, humanizeFilmReleaseDate, sortFilmByDate};
