import HttpClient from './utils/HttpClient';

class CategoriaService {
  constructor() {
    this.httpClient = new HttpClient('https://rajfood-api.herokuapp.com/api');
  }

  async listCategories() {
    return this.httpClient.get('/categoria');
  }

  async getCategory(id) {
    return this.httpClient.getById(`/categoria/${id}`);
  }

  async createCategory(categories) {
    return this.httpClient.post('/categoria', categories);
  }

  async updateCategory(id, category) {
    return this.httpClient.update(`/categoria/${id}`, category);
  }

  async deleteCategory(id) {
    return this.httpClient.delete(`/categoria/${id}`);
  }
}

export default new CategoriaService();
