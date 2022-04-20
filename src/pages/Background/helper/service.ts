import { getApiKey, getBaseURL } from "./storage"

class HttpClient {

  constructor(private baseUrl: string, private apiKey: string) { }

  private getHeaders() {
    return {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json'
    }
  }

  async get(url: string, params: any) {
    return fetch(this.baseUrl + url + '?' + new URLSearchParams(params), {
      headers: this.getHeaders(),
      method: 'GET'
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      } else {
        throw Error(`${response.status}: ${response.statusText}`)
      }
    })
  }

  async post(url: string, body: any) {
    return fetch(url + this.baseUrl, {
      headers: this.getHeaders(),
      method: 'POST',
      body
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      } else {
        throw Error(`${response.status}: ${response.statusText}`)
      }
    })
  }
}

export async function scanLink(url: string) {
  const apiKey = await getApiKey()
  const baseUrl = await getBaseURL()

  const client = new HttpClient(baseUrl, apiKey)
  const response = await client.post('/api/scan/url', { url })
  console.log(response)


}