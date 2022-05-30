import { getRandomInteger } from '../utils/common.js';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

const generateTitle = () => {
  const title = [
    'made-for-each-other',
    'popeye-meets-sinbad',
    'sagebrush-trail',
    'santa-claus-conquers-the-martians',
    'the-dance-of-life'
  ];

  const randomIndex = getRandomInteger(0, title.length - 1);

  return title[randomIndex];
};

const generatePoster = () => {
  const poster = [
    'images/posters/the-great-flamarion.jpg',
    'images/posters/sagebrush-trail.jpg',
    'images/posters/santa-claus-conquers-the-martians.jpg',
    'images/posters/the-dance-of-life.jpg',
    'images/posters/the-great-flamarion.jpg'
  ];

  const randomIndex = getRandomInteger(0, poster.length - 1);

  return poster[randomIndex];
};

const generateData = () => {
  const maxDaysGap = 600;

  const daysGap = getRandomInteger(-maxDaysGap, 0);

  return dayjs().add(daysGap, 'day').toDate();
};

const generateRating = () => {
  const maxRating = 100;

  const ratingGap = getRandomInteger(0, maxRating);

  return ratingGap;
};

const generateDescription = () => {
  const description = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.'
  ];

  const randomIndex = getRandomInteger(0, description.length - 1);

  return description.slice(randomIndex);
};

const generateComment = () => {
  const comment = [
    'a film that changed my life',
    'a true masterpiece',
    'post-credit scene was just amazing omg.',
  ];

  const randomIndex = getRandomInteger(0, comment.length - 1);

  return comment[randomIndex];
};

export const generateComments = () => ({
  id: '42',
  author: 'Ilya O\'Reilly',
  comment: generateComment(),
  date: '2019-05-11T16:12:32.554Z',
  emotion: 'smile'
});

export const generateMovie = () => ({
  id: nanoid(),
  comments: [
    generateComments(), generateComments(), generateComments()
  ],
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: generateRating()/10,
    poster: generatePoster(),
    ageRating: 0,
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano'
    ],
    actors: [
      'Morgan Freeman'
    ],
    release: {
      date: generateData(),
      releaseCountry: 'Finland'
    },
    runtime: 77,
    genre: [
      'Comedy'
    ],
    description: generateDescription()
  },
  userDetails: {
    watchlist: Boolean(getRandomInteger(0, 1)),
    alreadyWatched: Boolean(getRandomInteger(0, 1)),
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: Boolean(getRandomInteger(0, 1))
  }
});

