import HttpClient from './utils/HttpClient';

class PedidoService {
  constructor() {
    this.httpClient = new HttpClient('https://rajfood-api.herokuapp.com/api');
  }

  async listPedidos() {
    return this.httpClient.get('/pedido');
  }

  async getPedido(id) {
    return this.httpClient.getById(`/pedidoAlternativa/${id}`);
  }

  async createPedido(pedido) {
    return this.httpClient.post('/pedido', pedido);
  }

  async updatePedido(id, pedido) {
    return this.httpClient.update(`/pedido/${id}`, pedido);
  }

  async deletePedido(id) {
    return this.httpClient.delete(`/pedido/${id}`);
  }
}

export default new PedidoService();
