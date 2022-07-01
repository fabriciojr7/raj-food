import HttpClient from './utils/HttpClient';

class UserService {
  constructor() {
    this.httpClient = new HttpClient('https://rajfood-api.herokuapp.com/api');
  }

  async listUsers() {
    return this.httpClient.get('/cliente');
  }

  async getUser(id) {
    return this.httpClient.getById(`/cliente/${id}`);
  }

  async createUser(users) {
    return this.httpClient.post('/cliente', users);
  }

  async updateUser(id, user) {
    return this.httpClient.update(`/cliente/${id}`, user);
  }

  async deleteUser(id) {
    return this.httpClient.delete(`/cliente/${id}`);
  }
}

export default new UserService();
