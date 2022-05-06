import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    const response = await fetch(`${this.baseURL}${path}`);

    const body = await response.json();

    if (response.ok) {
      return body;
    }

    throw new APIError(
      body.message,
      response,
    );
  }

  async getById(path) {
    const response = await fetch(`${this.baseURL}${path}`);

    const body = await response.json();

    if (response.ok) {
      return body;
    }

    throw new APIError(
      body.message,
      response,
    );
  }

  async post(path, data, header = 'application/json') {
    const headers = header !== 'multipart/form-data' ? {
      headers: {
        'Content-Type': header,
      },
    } : {};
    const dataInit = {
      method: 'POST',
      ...headers,
      body: header !== 'multipart/form-data' ? JSON.stringify(data) : data,

    };
    const response = await fetch(`${this.baseURL}${path}`, dataInit);
    return response.json();
  }

  async update(path, data, header = 'application/json') {
    const headers = header !== 'multipart/form-data' ? {
      headers: {
        'Content-Type': header,
      },
    } : {};
    const dataInit = {
      method: 'PUT',
      ...headers,
      body: header !== 'multipart/form-data' ? JSON.stringify(data) : data,
    };
    const response = await fetch(`${this.baseURL}${path}`, dataInit);
    return response.json();
  }

  async delete(path) {
    const dataInit = {
      method: 'DELETE',
    };
    const response = await fetch(`${this.baseURL}${path}`, dataInit);
    return response.json();
  }
}

export default HttpClient;
