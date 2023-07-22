/**
 * APIリクエスト クラス
 *
 * @class requestAPI
 * @example
 *   const api = new requestAPI();
 *   const res = await api.get('/api/save', {a:123, b:456});
 */
class requestAPI{
  /**
   * APIリクエスト(GET)
   *
   * @param {string} url
   * @param {object} [data={}]
   * @returns {object<Promise>}
   */
  get(url, data={}){
    return this.request(url, 'GET', data);
  }

  /**
   * APIリクエスト(POST)
   * @param {string} url
   * @param {object} [data={}]
   * @returns {object<Promise>}
   */
  post(url, data={}){
    return this.request(url, 'POST', data);
  }

  /**
   * APIリクエスト
   *
   * @param {string} url    リクエスト先URL
   * @param {string} method 'GET' or 'POST'
   * @param {object} data   送信データ  例：{a:123, b:456}
   * @returns {object<Promise>}
   */
  request(url, method, data){
    const params = new URLSearchParams(data);   // {a:123, b:456} => 'a=123&b=456' に変換

    if( method === 'GET' ){
      return fetch(`${url}?${params}`);
    }
    else if( method === 'POST' ){
      return fetch(url, {
        method,   // method: method,と同じ意味
        body: params
      });
    }
  }
}