/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 16:08:12
 * @LastEditTime: 2019-10-12 16:59:44
 * @LastEditors: Please set LastEditors
 */

/**
 * @description:对象的深拷贝
 * @param {type}
 * @return:
 */
export const deepObj = obj => {
  console.log(
    [].constructor === Object,
    {}.constructor === Object,
    "flattenflattenflattenflattenflattenflatten"
  );
  // if (typeof obj !== "object") return;
  // let newObj = Array.isArray(obj1) ? [] : {};
  // for (let item in obj) {
  //   newObj[item] = typeof obj[val] == "object" ? obj[item] : deepObj(obj[item]);
  // }
};
//数组的打平
// export const flatten = arr => {
//   let arr = [1, [2, 3], [4, [6, 7], 5]];
//   let newArr = [];
//   if (arr.length === 0) return;
//   arr.forEach(item => {
//     if (Araay.isArray(item)) {
//       newArr = newArr.concat(flatten(item));
//     } else {
//       newArr.push(item);
//     }
//   });
// };

/**
 * @description:数组乱序
 * @param {type}其实它的思想非常的简单，遍历数组元素，将其与之前的任意元素交换。因为遍历有从前向后和从后往前两种方式，所以该算法大致也有两个版本的实现。
 * @return:
 */
export function shuffle() {
  // arr.sort(() => Math.random() - 0.5);
  var arr = [1, 2, 3, 4, 5, 6];
  let m = arr.length;
  while (m > 1) {
    let index = Math.floor(Math.random() * m--);
    [arr[m], arr[index]] = [arr[index], arr[m]];
  }
  console.log(arr);
  return arr;
}

/**
 * @description:数组对象排序
 * @param {type}
 * @return:
 */
export const laj2 = () => {
  var arr = [
    { name: "zopp", age: 0 },
    { name: "gpp", age: 18 },
    { name: "yjj", age: 8 }
  ];

  function compare(property) {
    return function(a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    };
  }
  console.log(arr.sort(compare("age")));
};
export const testlaji = arr => {
  // const newArr = arr.map(item => item.name).sort();
  // const result = [];
  // newArr.forEach(name1 => {
  //   arr.forEach(item => {
  //     if (name1 === item.name) {
  //       result.push(item);
  //     }
  //   });
  // });
  // console.log(newArr, result);
  let pArr = [1, 2, 4, 5, 6, 7];
  const rep = [];
  const newArr = [];
  const mathDom = Math.floor(Math.random() * pArr.length);
  pArr.forEach(item => {
    if (rep.indexOf(mathDom) === -1) {
      newArr = pArr[mathDom];
    }
  });
};
/**
 * @description:冒泡排序
 * @param {type}
 * @return:
 */

export const bubbleSort = arr => {
  if (arr.length === 0) return;
  const len = arr.length;
  let temp = [];
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j + 1];
        [arr[j + 1], arr[j]] = [arr[j], temp];
        // arr[j + 1] = arr[j];
        // arr[j] = temp;
      }
    }
  }
  console.log(arr, "arr");
  return arr;
};

/**
 * @description:快速排序
 * @param {type}
 * @return:
 */
export const quickSort = arr => {
  console.time("2.快速排序耗时");
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  console.timeEnd("2.快速排序耗时");
  return quickSort(left).concat([pivot], quickSort(right));
};

/**
 * @description: slice splice concat
 * @param {type}
 * @return:
 */
export const concat = arr => {
  //   slice(start，end)
  // 从start开始截取到end但是不包括end
  // 返回值为截取出来的元素的集合
  // 原始的数组不会发生变化
  //  splice(start,deleteCount,item1,item2…..);
  // start参数 开始的位置
  // deleteCount 要截取的个数
  // 后面的items为要添加的元素
  // 如果deleteCount为0，则表示不删除元素，从start位置开始添加后面的几个元素到原始的数组里面
  // 返回值为由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组
  // 这个方法会改变原始数组，数组的长度会发生变化
};

/**
 * @description:数组深拷贝
 * @param {type}
 * @return:
 */
// var arr = [1,2,3,4,5];
//   var [ ... arr2 ] = arr;
//   console.log(arr); //[1,2,3,4,5]
//   console.log(arr2); //[1,2,3,4,5]

// var arr1 = [3, 4, 5];
// var arr2 = arr1.concat();
// console.log(arr2); //[3,4,5]

/**
 * @description:数组去重
 * @param {type}
 * @return:
 */
// [...new Set(array)];

export const noRepeat = arr => {
  let newArr = [];
  var object = [];
  // arr.forEach(item => {
  //   newArr.indexOf(item) === -1 ? newArr.push(item) : null;
  // });
  if (typeof arr[0] === "object") {
    //
    arr.forEach(item => {
      if (object.indexOf(item.name) === -1) {
        object.push(item.name);
        newArr.push(item);
      }
    });
    console.log(newArr, object);
  } else {
    return [...new Set(array)];
  }
};
export const noRepeat1 = arr => {
  let obj = {};
  let newArr = [];
  if (typeof arr[0] === "object") {
    arr.forEach((item, i) => {
      obj[item.name] = item;
    });
    for (let i in obj) {
      newArr.push(obj[i]);
      console.log(newArr, "obj");
    }
  }
};
// reduce 去除重复
export const tetsReduc = arr => {
  const newArr = arr.reduce((total, currentValue) => {
    console.log(total);
    console.log(currentValue);
    return total + currentValue;
  });
  console.log(newArr);
};

/**
 * @description:求数组中出现的最大次数和最大次数的值
 * @param {type}
 * @return:
 */
export const maxCount = arr => {
  if (!arr.length) return;
  if (arr.length === 1) return "1";
  let obj = {};
  let maxItem = 0; //最大次数是哪个数
  let maxNum = 0; //出现了几次
  arr.forEach(item => {
    obj[item] ? (obj[item] += 1) : (obj[item] = 1);
  });
  maxNum = Object.values(obj);
  const max = Math.max(...maxNum);
  for (let item in obj) {
    console.log(obj[item], "obj[item]");
    if (obj[item] === max) {
      maxItem = item;
      console.log(item, "item");
    }
  }
};
export const maxCount1 = arr => {
  if (!arr.length) return;
  if (arr.length === 1) return "1";
  let obj = {};
  let maxItem = 0; //最大次数是哪个数
  let maxNum = 0; //出现了几次
  arr.forEach(item => {
    obj[item] ? (obj[item] += 1) : (obj[item] = 1);
    if (obj[item] > maxNum) {
      maxNum = obj[item];
      maxItem = item;
    }
  });
  console.log(maxItem, maxNum);
};

/**
 * @description:实现窗口之间的通信 添加自定义事件storage事件
 * @param {type}
 * @return:
 */

// if (!localStorage.getItem("a")) {
//   localStorage.setItem("a", 1);
// } else {
//   var s = localStorage.getItem("a");
//   localStorage.setItem("a", +s + 1);
// }
// window.addEventListener("storage", e => console.log(e));
/**
 * @description:倒计时组件开发settimeout
 * @param {type}
 * @return:
 */

export const time = start => {
  setTimeout(() => {
    start = start - 1000;
    start > -1 ? time(start) : null;
  }, 1000);
  console.log(start);
};

/**
 * @description: 对象的深拷贝
 * @param {type}
 * @return:
 */
export const deepClone = obj => {
  let newObj = obj instanceof Array ? [] : {};
  for (var i in obj) {
    console.log(i, "newObj");
    newObj[i] = typeof obj[i] == "object" ? deepClone(obj[i]) : obj[i];
  }
  return newObj;
};
