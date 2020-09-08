import queryString from 'querystring'

const publicPath =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://fried-fruit.briefguo.com'

export class Localhost {
  static prefix = '/api/v1'
  static token = ''
  static from(token) {
    Localhost.token = token
    return Localhost
  }
  static createFetchFromMethod = method => (url: string, params?) => {
    if (!url.endsWith('/')) {
      throw Error('url in localAPI must be end with `/` ')
    }
    return fetch(publicPath + url, {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': Localhost.token,
      },
      body: params ? queryString.stringify(params) : null,
    }).then(res => res.json())
  }
  static post = Localhost.createFetchFromMethod('POST')
  static get = Localhost.createFetchFromMethod('GET')
  static delete = Localhost.createFetchFromMethod('DELETE')
  static uploadFile = async (file: File): Promise<string> => {
    const formdata = new FormData()
    formdata.append('file', file)
    const url = '/api/v1/oss/upload/'
    const init = {
      method: 'POST',
      body: formdata,
    }
    const result = await fetch(publicPath + url, init).then(res => res.json())
    return result.url
  }
}
