import {
  get,
  postJson,
  post,
  fileUpload
} from '../utils/fetch'
import apiList from './api'
export const ajax = (param) => {
  const baseUrl = "http://47.98.153.196:9998"
  // const baseUrl="http://192.168.31.244:9998"
  // const baseUrl = "https://jsonplaceholder.typicode.com"
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