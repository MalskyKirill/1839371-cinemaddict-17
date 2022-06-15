import Observable from '../framework/observable.js';
//import { generateComments } from '../mock/movie-fish.js';

export default class CommentsModel extends Observable {

  //#comments = Array.from({length: 5}, (_, index) => generateComments(index + 1));
  #filmsApiService = null;

  #comments =[];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (film) => {
    try {
      const comments = await this.#filmsApiService.getCommentById(film);
      this.#comments = comments;
    } catch (err) {
      this.#comments = [];
    }
  };

  getCommentById(commentId) {
    return this.#comments.find((comment) => comment.id === commentId);
  }

  addComment = (updateType, update) => {

    this.#comments.push({
      id: update.commentId,
      comment: update.comment,
      author: '...',
      date: new Date().toISOString(),
      emotion: update.emotion
    });

    this._notify(updateType, update);
  };

  deleteComment = (updateType, id) => {
    const index = this.#comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      throw new Error('Can not delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
