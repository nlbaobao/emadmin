import axios from "axios";
import message from "antd";
import qs from 'qs'

export const http = request => {
    //跨域问题会引发两次请求 https://juejin.im/post/5c68b2efe51d457fd52ee155
  let { timeout, api, method, data, isCancelRequest = false } = request;
  const baseURL = "https://jsonplaceholder.typicode.com/";
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  // 创建axios实例
  let instance = axios.create({ timeout, baseURL });
  let methodMap = ["post", "put", "delete"];
  const lowerMethod = method.toLowerCase();
  let CancelToken = axios.CancelToken; // 使用 cancel token 取消请求
  window.axios_pending = window.axios_pending ? window.axios_pending : [];
  let pending = window.axios_pending;

  let removePending = config => {
    pending.forEach((ite, index) => {
      let cur_reqId = config.url + "&" + config.method;
      if (ite.reqId && ite.reqId === cur_reqId) {
        //当当前请求在数组中存在时执行函数体
        ite.candelFunc && ite.candelFunc(); //执行取消操作
        pending.splice(index, 1); //把这条记录从数组中移除
      }
    });
  };
  data = data ? data : {};
  let options = {
    method,
    url: api
  };

  methodMap.includes(lowerMethod)
    ? (options.data = data)
    : (options.params = data);

  // 添加请求拦截器
  instance.interceptors.request.use(
    config => {
      // 登录流程控制中，根据本地是否存在token判断用户的登录情况
      // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
      // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
      // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
      // console.log(config,'config');
    //   if (config.method === 'post') {
    //     config.data = qs.stringify(config.data)
    //     debugger;
    // }
      config.headers["xsrf-token"] = window._csrf;
      removePending(config); // 在一个ajax发送前执行一下取消操作
      config.cancelToken = new CancelToken(function executor(candelFunc) {
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        if (isCancelRequest) {
          pending.push({
            reqId: config.url + "&" + config.method,
            candelFunc: candelFunc
          });
        }
      });
      return config;
    },
    error => Promise.error(error)
  );

  // 添加响应拦截器
  // 响应拦截器
  instance.interceptors.response.use(
    // 请求成功
    response => {
      removePending(response.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
      return response;
    },
    // 请求失败
    error => {
      const { response } = error;
      if (response) {
        // 请求已发出，但是不在2xx的范围
        // errorHandle(response.status, response.data.message);
        return response;
      } else {
        // 处理断网的情况
        // eg:请求超时或断网时，更新state的network状态
        // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
        // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      }
    }
  );
  return new Promise((resolve, reject) => {
    instance(options)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
