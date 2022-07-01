import HttpClient from './utils/HttpClient';

class AddressService {
  constructor() {
    this.httpClient = new HttpClient('https://rajfood-api.herokuapp.com/api');
  }

  async realizalogin(dados) {
    return this.httpClient.post('/login', dados);
  }

  async realizalogout() {
    return this.httpClient.post('/logout');
  }
}

export default new AddressService();
