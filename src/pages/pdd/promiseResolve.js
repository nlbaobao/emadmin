/*
 * @Description: In User Settings Edit
 * @Author: Mars
 * @Date: 2019-09-10 10:24:24
 * @LastEditTime: 2019-09-10 16:06:57
 * @LastEditors: Please set LastEditors
 */
/**
 * @description:
 * @param {type}
 * @return:
 */
Promise.resolve("foo");
// 等价于
new Promise(resolve => resolve("foo"));

// const jsPromise = Promise.resolve($.ajax("/whatever.json"));
/**
 * @description:如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
 * @param {type}
 * @return:
 */
export const resolveTest = () => {
  const p = new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve("ok");
    }, 2000);
  });
  console.log(p, "p");
  const test = Promise.resolve(p);
  console.log(p, "p1");
  console.log(test, "test");
  test.then(value => {
    console.log(value, "resolveTest");
  });
};
/**
 * @description: 参数是一个thenable对象
 * @param {type}
 * @return:
 */
export const thenable = () => {
  let thenable = {
    then: (resolve, reject) => {
      resolve(42);
      reject("error");
    }
  };
  const p = Promise.resolve(thenable);
  p.then(value => {
    console.log(value, "thenable");
  }).catch(err => {
    console.log(err);
  });
};
/**
 * @description:上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。
 * @param {type}
 * @return:
 */

setTimeout(function() {
  console.log("three");
}, 0);

Promise.resolve().then(function() {
  console.log("two");
});

console.log("one");
