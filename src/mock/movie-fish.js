import { getRandomInteger } from '../utils/common.js';

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

const generateComments = () => ({
  id: '42',
  author: 'Ilya O\'Reilly',
  comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  date: '2019-05-11T16:12:32.554Z',
  emotion: 'smile'
});

export const generateMovie = () => ({
  id: '0',
  comments: [
    generateComments(), generateComments()
  ],
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: 5.3,
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
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'Finland'
    },
    runtime: 77,
    genre: [
      'Comedy'
    ],
    description: generateDescription()
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false
  }
});

