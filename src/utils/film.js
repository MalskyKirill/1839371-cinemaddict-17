import dayjs from 'dayjs';

const humanizeFilmDueDate = (dueDate) => dayjs(dueDate).format('YYYY');
const humanizeFilmReleaseDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');

//const isMovieWatchlist = (watchlist) => Object.values(watchlist).some(Boolean);

export {humanizeFilmDueDate, humanizeFilmReleaseDate};
