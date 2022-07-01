import HttpClient from './utils/HttpClient';

class DetalhesPedidoService {
  constructor() {
    this.httpClient = new HttpClient('https://rajfood-api.herokuapp.com/api');
  }

  async listDetalhe() {
    return this.httpClient.get('/pedido');
  }

  async getDetalhe(id) {
    return this.httpClient.getById(`/pedido/${id}`);
  }

  async createDetalhe(detalhe) {
    return this.httpClient.post('/detalhesPedido', detalhe);
  }

  async updateDetalhe(id, detalhe) {
    return this.httpClient.update(`/pedido/${id}`, detalhe);
  }

  async deleteDetalhe(id) {
    return this.httpClient.delete(`/pedido/${id}`);
  }
}

export default new DetalhesPedidoService();
