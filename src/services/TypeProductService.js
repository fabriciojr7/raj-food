import HttpClient from './utils/HttpClient';

class TypeProductService {
  constructor() {
    this.httpClient = new HttpClient('https://rajfood-api.herokuapp.com/api');
  }

  async listTypes() {
    return this.httpClient.get('/tipoProduto');
  }

  async getType(id) {
    return this.httpClient.getById(`/tipoProduto/${id}`);
  }

  async createType(types) {
    return this.httpClient.post('/tipoProduto', types);
  }

  async updateType(id, type) {
    return this.httpClient.update(`/tipoProduto/${id}`, type);
  }

  async deleteType(id) {
    return this.httpClient.delete(`/tipoProduto/${id}`);
  }
}

export default new TypeProductService();
