import ApiRequest from './ApiRequest';

export default class Api {

  static get(focus, data = {}) {
    return new ApiRequest(focus, data, 'get');
  }

  static post(focus, data = {}) {
    return new ApiRequest(focus, data, 'post');
  }

}
