import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class CommentsApiService extends ApiService {
  get comments() {
    return this._load({url: 'comments'})
      .then(ApiService.parseResponse);
  }

  getComments = (film) => this._load({url: `comments/${film.id}`}).then(ApiService.parseResponse);

  updateComments = async (comment, film) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

}

