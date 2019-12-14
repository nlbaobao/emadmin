/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-09 23:39:54
 * @LastEditTime: 2019-09-10 11:16:18
 * @LastEditors: Please set LastEditors
 */
/**
 * @description: 接收一个 Promise 实例的数组或具有 Iterator 接口的对象，
 * 2、如果元素不是 Promise 对象，则使用 Promise.resolve 转成 Promise 对象3、如果全部成功，状态变为 resolved，
 * 返回值将组成一个数组传给回调4、只要有一个失败，状态就变为 rejected，返回值将直接传递给回调all() 的返回值也是新的 Promise 对象
 * @param {type}
 * @return:
 */
export const promiseAll = promises => {
  return new Promise(function(resolve, reject) {
    //promises必须是一个数组
    if (!(promises instanceof Array)) {
      throw new TypeError("promises must be an Array");
    }
    var len = promises.length,
      resolvedCount = 0,
      resolvedArray = new Array(len);
    for (var i = 0; i < len; i++) {
      (function(i) {
        Promise.resolve(promises[i])
          .then(
            value => {
              resolvedCount++;
              resolvedArray[i] = value;
              if (resolvedCount == len) {
                return resolve(resolvedArray);
              }
            },
            re => {
              return reject(re);
            }
          )
          .catch(re => {
            console.log(re);
          });
      })(i);
    }
  });
};
