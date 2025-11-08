const defaultHeaders = {
  'Content-Type': 'application/json',
};

class HttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      credentials: 'same-origin',
    });
    return this.parseResponse<T>(response);
  }

  async post<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    });
    return this.parseResponse<T>(response);
  }

  async patch<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    });
    return this.parseResponse<T>(response);
  }

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: defaultHeaders,
    });
    return this.parseResponse<T>(response);
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Request failed with status INR {response.status}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json() as Promise<T>;
  }
}

export const http = new HttpClient();

