import HttpClient from './utils/HttpClient';

class ClientService {
  constructor() {
    this.httpClient = new HttpClient('https://rajfood-api.herokuapp.com/api');
  }

  async listCustumers() {
    return this.httpClient.get('/cliente');
  }

  async getClient(id) {
    return this.httpClient.getById(`/cliente/${id}`);
  }

  async createClient(custumers) {
    return this.httpClient.post('/cliente', custumers);
  }

  async updateClient(id, client) {
    return this.httpClient.update(`/cliente/${id}`, client);
  }

  async deleteClient(id) {
    return this.httpClient.delete(`/cliente/${id}`);
  }
}

export default new ClientService();
