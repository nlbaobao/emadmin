<!--
 * @Description: In User Settings Edit
 * @Author: Mars
 * @Date: 2019-09-04 14:45:36
 * @LastEditTime: 2019-09-06 16:04:20
 * @LastEditors: Please set LastEditors
 -->

// 快速排序
var quickSort = function(arr) {
if (arr.length <= 1) { return arr; }
var pivotIndex = Math.floor(arr.length / 2);
var pivot = arr.splice(pivotIndex, 1)[0];
var left = [];
var right = [];
for (var i = 0; i < arr.length; i++){
if (arr[i] < pivot) {
left.push(arr[i]);
} else {
right.push(arr[i]);
}
}
return quickSort(left).concat([pivot], quickSort(right));
};

问的问题：
算是内推吗？需要经过几轮面试。是谁面试。
这次的岗位算是什么级别，面试的程度能达到什么级别。
您说准备准备机会挺大的，按照我对大厂面试程度的了解。我觉得自己还有欠缺。
介绍下自身现在在做什么工作（技术栈）()。
对他们做的业务进行咨询。
