/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 23:43:49
 * @LastEditTime: 2019-09-16 23:47:37
 * @LastEditors: Please set LastEditors
 */
/**
 * @description: 块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。
块级格式化上下文
BFC是一个独立的布局单元
即这个元素的布局不会影响到其它的元素（这个元素的内容不会超到外面去，不影响其它的元素）
想象：这个元素及其子元素在单独的iframe里面/浏览器窗口去布局
这意味着BFC元素一定是方形的，其他元素进不来，内部元素也出不去
 * @param {type} 
 * @return: 
 */
/**
 * @description: 
 * 根元素或包含根元素的元素
浮动元素（元素的 float 不是 none）
绝对定位元素（元素的 position 为 absolute 或 fixed）
行内块元素（元素的 display 为 inline-block）
表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
匿名表格单元格元素（元素的 display为 table、``table-row、 table-row-group、``table-header-group、``table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
overflow 值不为 visible 的块元素
display 值为 [flow-root](https://drafts.csswg.org/css-display/#valdef-display-flow-root) 的元素
contain 值为 layout、content或 strict 的元素
弹性元素（display为 flex 或 inline-flex元素的直接子元素）
网格元素（display为 grid 或 inline-grid 元素的直接子元素）
多列容器（元素的 column-count 或 column-width 不为 auto，包括 ``column-count 为 1）
column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。
 * @param {type} 
 * @return: 
 */
