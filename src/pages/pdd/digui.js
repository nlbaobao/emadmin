/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 00:28:54
 * @LastEditTime: 2019-09-17 00:30:46
 * @LastEditors: Please set LastEditors
 */

/**
 * @description:对象的深拷贝
 * @param {type}
 * @return:
 */
export const deepCopy = obj => {
  if (typeof obj !== "object") return;
  // // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
};
/**
 * @description:即如何把[1, [2], [3, [4, [5]]]]拍平得到[1,2,3,4,5]
 * @param {type}
 * @return:
 */
export const flatten = arr => {
  let result = [];
  arr.forEach((item, i, arr) => {
    // 若为数组,递归调用 faltten,并将结果与result合并
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(arr[i]);
    }
  });
  return result;
};
const arr = [1, [2, [3, 4, 5]]];
console.log(flatten(arr)); // [1, 2, 3, 4, 5]
