import HttpClient from './utils/HttpClient';

class UserService {
  constructor() {
    this.httpClient = new HttpClient('https://rajfood-api.herokuapp.com/api');
  }

  async getSettings() {
    return this.httpClient.getById('/restaurante/1');
  }

  async updateSettings(settings) {
    return this.httpClient.update('/restaurante/1', settings);
  }
}

export default new UserService();
