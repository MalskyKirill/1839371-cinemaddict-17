import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {

  #commentsApiService = null;

  #comments =[];

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;

    // this.#commentsApiService.comments.then((comments) => {
    //   console.log(comments);

    // });
  }

  getComments = async (filmId) => {
    try {
      this.#comments = await this.#commentsApiService.getComments(filmId);
      return this.#comments;
    } catch(err) {
      throw new Error('Can\'t get comments');
    }
  };


  // init = async () => {
  //   try {
  //     const comments = await this.#commentsApiService.comments;
  //     this.#comments = comments;
  //   } catch (err) {
  //     this.#comments = [];
  //   }
  // };

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
