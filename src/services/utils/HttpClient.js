import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    const dataInit = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await fetch(`${this.baseURL}${path}`, dataInit);

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
    const dataInit = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await fetch(`${this.baseURL}${path}`, dataInit);

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
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await fetch(`${this.baseURL}${path}`, dataInit);
    return response.json();
  }
}

export default HttpClient;
