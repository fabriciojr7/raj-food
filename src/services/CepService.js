import HttpClient from './utils/HttpClient';

class CepService {
  constructor() {
    this.httpClient = new HttpClient('https://viacep.com.br/ws');
  }

  async buscaCep(cep) {
    return this.httpClient.get(`/${cep}/json/`);
  }
}

export default new CepService();
