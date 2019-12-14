/*
 * @Description: In User Settings Edit
 * @Author: test Promise
 * @Date: 2019-09-07 17:05:48
 * @LastEditTime: 2019-09-10 15:52:01
 * @LastEditors: Please set LastEditors
 */
/**
 * @description: resolve函数的作用是，
 * 将Promise对象的状态从“未完成”变为“成功”（
 * 即从 pending 变为 resolved），在异步操作成功时调用，
 * 并将异步操作的结果，作为参数传递出去；reject函数的作用是，
 * 将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，
 * 并将异步操作报出的错误，作为参数传递出去。
 * @param {type}
 * @return:
 */
export const test1 = () => {
  const promise = new Promise(function(resolve, reject) {
    let flag = null;
    // setTimeout(() => {
    //   flag = true;
    // }, 1000);

    // if (flag) {
    //   resolve("value");
    // } else {
    //   reject("test");
    // }
    reject("test");
    resolve("value");

    console.log("我在之后执行"); // 第一次执行;
  });
  console.log(promise, "promise");
  promise
    .then(param => {
      console.log(param);
    })
    .catch(error => {
      console.log(error, "error"); // 最后执行;
    });
  console.log("我先执行"); // 第二次执行;
};

/**
 * @description:
 * @param {type}
 * @return:
 */
export const timeout = ms => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "done");
  });
};
/**
 * @description:下面代码中，Promise
 * 新建后立即执行，所以首先输出的是Promise。
 * 然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。
 * @param {type}
 * @return:
 */
export const order = () => {
  let promise = new Promise(function(resolve, reject) {
    console.log("Promise");
    resolve();
    reject();
  });

  promise
    .then(function() {
      console.log("resolved.");
    })
    .catch(error => {
      console.log("rejected", error);
    });

  console.log("Hi!");
};
/**
 * @description:上面代码中，p1是一个 Promise，3 秒之后变为rejected。
 * p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，导致p2自己的状态无效了
 * ，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，
 * 导致触发catch方法指定的回调函数。
 * @param {type}
 * @return:
 */
export const test2 = () => {
  const p1 = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(new Error("fail")), 3000);
  });

  const p2 = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(p1), 1000);
  });

  p2.then(result => console.log(result)).catch(error => console.log(error));
};

/**
 * @description:Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”
 * @param {type}
 * @return:
 */
// const someAsyncThing = function() {
//   return new Promise(function(resolve, reject) {
//     // 下面一行会报错，因为x没有声明
//     resolve(x + 2);
//   });
// };

// someAsyncThing().then(function() {
//   console.log("everything is great");
// });

// setTimeout(() => {
//   console.log(123);
// }, 2000);
// // Uncaught (in promise) ReferenceError: x is not defined
// // 123
/**
 * @description: xia面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。
 * @param {type}
 * @return:
 */
// setTimeout(function() {
//   console.log("three");
// }, 0);

// Promise.resolve().then(function() {
//   console.log("two");
// });

// console.log("one");

// one
// two
// three

/**
 * @description:promise.resolve()
 * @param {type}
 * @return:
 */
/**
 * @description: Promise 新建后就会立即执行。resolve函数的作用是，
 * 将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
 * reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），
 * 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
 * @param {type}
 * @return:
 */
export const http = () => {
  const promise = new Promise((resolve, reject) => {
    const value = 1;
    // x = 2;
    // console.log(resolve(value + x), reject("error"));
  });

  promise
    .then(param => {
      console.log(param, "then");
    })
    .catch(error => {
      console.log(error, "catch");
    });
  console.log("test1111");
  setTimeout(() => {
    console.log("setTimeout");
  }, 100);
};
export const catchTest = () => {
  return new Promise((resolved, rejected) => {
    resolved("ok");
    throw new Error("test");
  });
};
/**
 * @description:promise.all上面代码中，p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，
 * p2指向的实际上是这个实例。该实例执行完catch方法后，
 * 也会变成resolved，导致Promise.all()方法参数里面的两个实例都会resolved，
 * 因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。
 * @param {type}
 * @return:
 */
export const promiseAll = () => {
  const p1 = new Promise((resolve, reject) => {
    resolve("hello");
  })
    .then(result => result)
    .catch(e => e);

  const p2 = new Promise((resolve, reject) => {
    throw new Error("报错了");
  })
    .then(result => result)
    .catch(e => e);

  // Promise.all([p1, p2])
  //   .then(result => console.log(result))
  //   .catch(e => console.log(e));
  // ["hello", Error: 报错了]
};

/**
 * @description:手动实现promiseAll
 * @param {type}
 * @return:
 */
export const promiseAlltest = () => {
  const p1 = new Promise((resolve, reject) => {
    resolve("ok");
  });
  const p2 = new Promise((resolve, reject) => {
    resolve(p1);
  });
};
