import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class CommentsModel extends Observable {

  #commentsApiService = null;

  #comments =[];

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;

  }

  get comments() {
    return this.#comments;
  }

  // getComments = async (filmId) => {
  //   try {
  //     this.#comments = await this.#commentsApiService.getComments(filmId);
  //     console.log(this.#comments);
  //     return this.#comments;
  //     // return this.#comments.find((comment) => comment.id === filmId);
  //   } catch(err) {
  //     throw new Error('Can\'t get comments');
  //   }
  // };


  init = async (filmId) => {
    try {
      this.#comments = await this.#commentsApiService.getComments(filmId);
      console.log(this.#comments);
    } catch (err) {
      this.#comments = [];
      console.error(err);
    }

    this._notify(UpdateType.INIT);
  };


  // getCommentById(commentId) {
  //   return this.#comments.find((comment) => comment.id === commentId);
  // }

  addComment = async (updateType, update) => {
    const comment = {
      id: update.commentId,
      comment: update.comment,
      author: '...',
      date: new Date().toISOString(),
      emotion: update.emotion
    };

    await this.#commentsApiService.addComment(comment, update.filmId);
    this.#comments.push(comment);
    this._notify(updateType, update);
  };

  deleteComment = async (updateType, id) => {
    await this.#commentsApiService.deleteComment(id);
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
