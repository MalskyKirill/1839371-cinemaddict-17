import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const humanizeFilmDueDate = (dueDate) => dayjs(dueDate).format('YYYY');
const humanizeFilmReleaseDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
const humanizeCommentDate = (dueDate) => dayjs(dueDate).fromNow();

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
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

const sortFilmByRating = (filmA, filmB) => {
  if (filmA.filmInfo.totalRating > filmB.filmInfo.totalRating) {
    return -1;
  }

  if (filmA.filmInfo.totalRating < filmB.filmInfo.totalRating) {
    return 1;
  }

  return 0;
};

export {humanizeFilmDueDate, humanizeFilmReleaseDate, humanizeCommentDate, sortFilmByDate, sortFilmByRating};
