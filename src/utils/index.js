import {get,post1,post} from '../utils/fetch'
import apiList from './api'
export const ajax = (param) =>{
 const baseUrl="http://39.98.45.151:9999"
// const baseUrl = "https://jsonplaceholder.typicode.com"
    const {
        method ,
        data = {},
        api,
    } = param;  
    const url =baseUrl +apiList[api]
    if(method==='get'){
      return get(url,data)
    }else{
      return post1(url,data)
    }
}