import HttpClient from './utils/HttpClient';

class UserService {
  constructor() {
    this.httpClient = new HttpClient('https://rajfood-api.herokuapp.com/api');
  }

  async listUsers() {
    return this.httpClient.get('/usuario');
  }

  async getUser(id) {
    return this.httpClient.getById(`/usuario/${id}`);
  }

  async createUser(users) {
    return this.httpClient.post('/usuario', users);
  }

  async updateUser(id, user) {
    return this.httpClient.update(`/usuario/${id}`, user);
  }

  async deleteUser(id) {
    return this.httpClient.delete(`/usuario/${id}`);
  }
}

export default new UserService();
