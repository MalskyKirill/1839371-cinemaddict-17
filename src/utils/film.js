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

const sortFilmByDate = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  return weight ?? dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
};

export {humanizeFilmDueDate, humanizeFilmReleaseDate, sortFilmByDate};
