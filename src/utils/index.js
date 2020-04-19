import {
  get,
  postJson,
  post,
  fileUpload
} from '../utils/fetch'
import apiList from './api'
export const ajax = (param) => {
  // const baseUrl = 'http://2hq8388555.goho.co'
  const baseUrl = 'http://test.zxy.world:7777/';
  // const baseUrl = 'http://zxy.world:9998'
  const {
    method,
    data = {},
    api,
  } = param;
  const url = baseUrl + apiList[api]
  if (method === 'get') {
    return get(url, data)
  } else if (method === 'post') {
    return post(url, data)
  } else if (method === 'postJson') {
    return postJson(url, data)
  } else if (method === 'fileUpload') {
    return fileUpload(url, data)
  } else {
    return post(url, data)
  }
}

export const uuid = (len, radix) => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}