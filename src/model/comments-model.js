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

  init = async (filmId) => {
    try {
      this.#comments = await this.#commentsApiService.getComments(filmId);
    } catch (err) {
      this.#comments = [];
    }

    this._notify(UpdateType.INIT);
  };


  addComment = async (updateType, update) => {
    try {
      const comment = {
        id: update.commentId,
        comment: update.comment,
        author: 'Kirill',
        date: new Date().toISOString(),
        emotion: update.emotion
      };

      await this.#commentsApiService.addComment(comment, update.filmId);
      this.#comments.push(comment);
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  };


  deleteComment = async (updateType, id) => {
    const index = this.#comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      throw new Error('Can not delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(id);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];

      this._notify(updateType);
    } catch {
      throw new Error('Can not delete comment');
    }
  };
}
