/*
 * @Author: your name
 * @Date: 2019-12-26 10:38:38
 * @LastEditTime : 2019-12-26 11:05:43
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /emadmin/src/utils/fetch.js
 */
import 'whatwg-fetch';
import { stringify } from 'qs';

/**
 * 使用 Get 方式进行网络请求
 * @param {*} url 
 * @param {*} data 
 */
export const get = (url, data) => {
    data.token = localStorage.getItem('token')?localStorage.getItem('token'):undefined
    const newUrl = url + '?' + stringify(data) + (stringify(data) === '' ? '' : '&') +'_random=' + Date.now();
    return fetch(newUrl, {
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Max-Age':'1728000'
            },
            method: 'GET',
        })
        .then(response => response.json());
}

/**
 * 进行 Post 方式进行网络请求
 * @param {*} url 
 * @param {*} data 
 */
export const post = (url, data) => {
   const  token = localStorage.getItem('token')?localStorage.getItem('token'):undefined
    const newUrl = url + '?' + stringify(data) + (stringify(data) === '' ? '' : '&') +'_random=' + Date.now();
    return fetch(newUrl, {
        // body: JSON.stringify(data), 
        cache: 'no-cache',
        headers: {
            'X-token': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            "access-control-allow-credentials": "true",
            'withCredentials': 'true'
            
        },
        method: 'POST',
    })
    .then(response => response.json()) // parses response to JSON
}
/**
 * 进行 Post 方式进行网络请求
 * @param {*} url 
 * @param {*} data 
 */
export const post1 = (url, data) => {
    const  token = localStorage.getItem('token')?localStorage.getItem('token'):undefined
    return fetch(url, {
        body:data, 
        cache: 'no-cache',
        headers: {
            'X-token': token,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            "access-control-allow-credentials": "true",
            'withCredentials': 'true'
            
        },
        method: 'POST',
    })
    .then(response => response.json()) // parses response to JSON
}