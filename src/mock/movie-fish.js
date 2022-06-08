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

export const generateComments = (id) => ({
  id,
  author: 'Ilya O\'Reilly',
  comment: generateComment(),
  date: '2019-05-11T16:12:32.554Z',
  emotion: 'smile'
});

/*
const film = {
  title: "...",
  ...,
  coments: [
    { id: 1, commnet: '', emotion: '', },
    { id: 2, commnet: '', emotion: '', },
    { id: 3, commnet: '', emotion: '', }
  ]
}
film.comments[0].commnet
*/


/*
const film = {
  title: "...",
  ...,
  comments: [
   1,2,3
  ]
}

const commnets = [
   { id: 1, commnet: '', emotion: '', },
   { id: 2, commnet: '', emotion: '', },
   { id: 3, commnet: '', emotion: '', }
]

const commentId = film.coments[0];
comments.find((comment) => comment.id)

function template(film) {
  let str = ''

  for(let i = 0; i < film.comments.length; i++) {
    const commentId = film.comments[i];
    const comment = comments.find((comment) => comment.id === commentId)
    str = `<div>${comment.smile}</div>`
  }
}
*/

// (index+1)*1000 + 1
// (index+1)*1000 + 2
// (index+1)*1000 + 3
// 2 + 1 -> id=3
// 2 + 2 -> id=4
// 3 + 1 -> id=4
export const generateMovie = () => ({
  id: nanoid(),
  comments: [
    1,2,3,4,5,6
    //generateComments(1), generateComments(2), generateComments(3), generateComments(4), generateComments(5)
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

