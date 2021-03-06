import axios from 'axios';

/**
 * Base class for models. Contains reused {@link request} function.
 */
export default class SDKInterface {
  static HTTP_GET = 0;

  static HTTP_POST = 1;

  static HTTP_PUT = 2;

  static HTTP_DELETE = 3;

  /**
   * Constructor of interface.
   *
   * @param {string} apiVersion the version of the api end point.
   */
  constructor(apiVersion = 'v1') {
    this.apiKey = window.MYBACK_API_TOKEN;
    this.endPoint = window.MYBACK_API_ENDPOINT;
    this.apiVersion = apiVersion;
  }

  /**
   * API request helper function.
   *
   * @param {number} method must be an integer, please use 'HTTP_XXX' static variable in this class.
   * @param {string} path API Path.
   * @param {object} requestBody Request body payload.
   */
  request(method, path, requestBody = {}) {
    switch (method) {
      case SDKInterface.HTTP_GET:
        return axios.get(`${this.endPoint}/${this.apiVersion}/${path}`);
      case SDKInterface.HTTP_POST:
        return axios.post(`${this.endPoint}/${this.apiVersion}/${path}`, requestBody);
      case SDKInterface.HTTP_PUT:
        return axios.put(`${this.endPoint}/${this.apiVersion}/${path}`, requestBody);
      case SDKInterface.HTTP_DELETE:
        return axios.delete(`${this.endPoint}/${this.apiVersion}/${path}`);
      default:
        throw `${method} is not one of the supported method code.`;
    }
  }
}
