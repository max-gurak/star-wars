import QueryString from 'query-string';
import axios from 'axios';
import { History } from 'base';

export default class ApiRequest {

  constructor(focus, data = {}, method = 'GET') {
    this.focus = focus;
    this.method = method;
    this.data = data;
    this.queryParams = {};
    this.axiosConfig = {};
    this.errorCallback = false;
  }

  async call() {
    let uri = `${process.env.API_URL}/api/${this.focus}/`;

    if (Object.keys(this.queryParams).length) {
      uri += `?${QueryString.stringify(this.queryParams)}`;
    }

    return new Promise((resolve, reject) => {
      axios[this.method](uri)
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          if (typeof this.errorCallback === 'function') {
            this.errorCallback(e);
          }
          else if (e.response.status === 404) {
            History.push('/404')
          }

          reject(e);
        })
    });
  }

  handleErrors(callback) {
    this.errorCallback = callback;

    return this;
  }

  withParams(parameters) {
    this.queryParams = Object.assign({}, this.queryParams, parameters);

    return this;
  }

}
