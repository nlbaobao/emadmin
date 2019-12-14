/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 10:56:04
 * @LastEditTime: 2019-10-08 16:10:30
 * @LastEditors: Please set LastEditors
 */
//https://juejin.im/post/5b652b036fb9a04fa01d616b
/**
 * @description:webpack构建过程优化
 * HardSourceWebpackPlugin
 * 
使用DllPlugin配置一个webpack_dll.config.js来构建dll文件：
在主config文件里使用DllReferencePlugin插件引入xx.manifest.json文件：

 DllPlugin插件：用于打包出一个个单独的动态链接库文件；
DllReferencePlugin:用于在主要的配置文件中引入DllPlugin插件打包好的动态链接库文件
需要注意DllPlugin的参数中name值必须和output.library值保持一致，并且生成的manifest文件中会引用output.library值。



**优化包查找路径
resolve.modules用于配置webpack去哪些目录下寻找第三方模块，默认是['node_modules']，但是，它会先去当前目录的./node_modules查找，没有的话再去../node_modules最后到根目录；
所以当安装的第三方模块都放在项目根目录时，就没有必要安默认的一层一层的查找，直接指明存放的绝对位置
合理配置resolve.extensions，减少文件查找
默认值：extensions:['.js', '.json'],当导入语句没带文件后缀时，Webpack会根据extensions定义的后缀列表进行文件查找，所以：
列表值尽量少
频率高的文件类型的后缀写在前面
源码中的导入语句尽可能的写上文件后缀，如require(./data)要写成require(./data.json)



1.配置loader时，通过test、exclude、include缩小搜索范围
2.使用 babel-loader 的时候开启 cacheDirectory 选项，会较为明显的提升构建速度
使用ParallelUglifyPlugin开启多进程压缩JS文件

 * @param {type}
 * @return:
 */
/**
 * @description:webpack构建结果优化
 *  spliting、懒加载JS
 * https://juejin.im/post/5b304f1f51882574c72f19b0#heading-7
 * webpack代码分割（code splitting）
 *

什么是代码分割
在最开始使用Webpack的时候, 
都是将所有的js文件全部打包到一个build.js文件中(文件名取决与在webpack.config.js文件中output.filename), 
但是在大型项目中, build.js可能过大, 导致页面加载时间过长. 这个时候就需要code splitting, code splitting就是将文件分割成块(chunk), 
我们可以定义一些分割点(split point), 根据这些分割点对文件进行分块, 并实现按需加载。

代码分割，也就是Code Splitting一般需要做这些事情：
为 Vendor 单独打包（Vendor 指第三方的库或者公共的基础组件，因为 Vendor 的变化比较少，单独打包利于缓存）
为 Manifest （Webpack 的 Runtime 代码）单独打包
为不同入口的业务代码打包，也就是代码分割异步加载（同理，也是为了缓存和加载速度）
为异步公共加载的代码打一个的包


 * 
 * 单页应用的一个问题在于使用一个页面承载复杂的功能，要加载的文件体积很大，不进行优化的话会导致首屏加载时间过长，
 * 影响用户体验。做按需加载可以解决这个问题。具体方法如下：


 * @param {type}
 * @return:optimization.splitChunks optimization.runtimeChunk
 */
