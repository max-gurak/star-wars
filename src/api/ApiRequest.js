import QueryString from 'query-string';
import axios from 'axios';

export default class ApiRequest {

  constructor(focus, data = {}, method = 'GET') {
    this.focus = focus;
    this.method = method;
    this.data = data;
    this.queryParams = {};
    this.axiosConfig = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    };
  }

  call() {
    let uri = `${process.env.API_URL}/api/${this.focus}/`;

    if (Object.keys(this.queryParams).length) {
      uri += `?${QueryString.stringify(this.queryParams)}`;
    }

    return axios[this.method](uri);
  }

  withParams(parameters) {
    this.queryParams = Object.assign({}, this.queryParams, parameters);

    return this;
  }

}
