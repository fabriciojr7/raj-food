import HttpClient from './utils/HttpClient';

class ProductService {
  constructor() {
    this.httpClient = new HttpClient('https://rajfood-api.herokuapp.com/api');
  }

  async listProducts() {
    return this.httpClient.get('/produto');
  }

  async getProduct(id) {
    return this.httpClient.getById(`/produto/${id}`);
  }

  async createProduct(product) {
    return this.httpClient.post('/produto', product, 'multipart/form-data');
  }

  async updateProduct(id, product) {
    return this.httpClient.update(`/produto/${id}`, product, 'multipart/form-data');
  }

  async deleteProduct(id) {
    return this.httpClient.delete(`/produto/${id}`);
  }
}

export default new ProductService();
