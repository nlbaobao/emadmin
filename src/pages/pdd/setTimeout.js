/*
 * @Description: In User Settings Edit
 * @Author: Mars
 * @Date: 2019-09-10 11:16:14
 * @LastEditTime: 2019-09-10 11:33:52
 * @LastEditors: Please set LastEditors
 */
export const settest = () => {
  setTimeout(() => {
    console.log("settimeout");
  }, 3000);
  sleep(10000);
};
const sleep = ms => {
  setTimeout(() => {
    console.log("sleep");
  }, ms);
};
export const settest2 = () => {
  for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
};
