import ApiService from './framework/api-service.js';

const Method = {
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class CommentsApiService extends ApiService {
  // get comments() {
  //   return this._load({url: 'comments'})
  //     .then(ApiService.parseResponse);
  // }


  // updateComments = async (comment, film) => {
  //   const response = await this._load({
  //     url: `comments/${film.id}`,
  //     method: Method.PUT,
  //     body: JSON.stringify(comment),
  //     headers: new Headers({'Content-Type': 'application/json'}),
  //   });

  //   const parsedResponse = await ApiService.parseResponse(response);

  //   return parsedResponse;
  // };

  getComments = async (filmId) => this._load({url: `comments/${filmId}`})
    .then(ApiService.parseResponse);

  addComment = async (comment, filmId) => {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  };

  deleteComment = async (commentId) => {
    const response = await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });

    return response;
  };

}

