/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-10 16:07:55
 * @LastEditTime: 2019-09-28 17:58:32
 * @LastEditors: Please set LastEditors
 */
/**
 * @description:react15和16的区别
 *  文件体积变得更小;
 * 重写核心算法，渲染性能更优

 * @param {type}
 * @return:
 */

class ExampleComponent extends react.Component {
  // 构造函数，最先被执行,我们通常在构造函数里初始化state对象或者给自定义方法绑定this
  constructor() {}
  //getDerivedStateFromProps(nextProps, prevState)用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用
  // 这是个静态方法,当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps
  static getDerivedStateFromProps(nextProps, prevState) {
    // 新的钩子 getDerivedStateFromProps() 更加纯粹, 它做的事情是将新传进来的属性和当前的状态值进行对比, 若不一致则更新当前的状态。
    if (nextProps.riderId !== prevState.riderId) {
      return {
        riderId: nextProps.riderId
      };
    }
    // 返回 null 则表示 state 不用作更新
    return null;
  }
  // shouldComponentUpdate(nextProps, nextState),有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true,我们通常利用此生命周期来优化react程序性能
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.id !== this.props.id;
  }
  // 组件挂载后调用
  // 可以在该函数中进行请求或者订阅
  componentDidMount() {}
  // getSnapshotBeforeUpdate(prevProps, prevState):这个方法在render之后，componentDidUpdate之前调用，
  //有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，
  //如果你不想要返回值，可以返回null，此生命周期必须与componentDidUpdate搭配使用
  getSnapshotBeforeUpdate() {}
  // 组件即将销毁
  // 可以在此处移除订阅，定时器等等
  componentWillUnmount() {}
  // 组件销毁后调用
  componentDidUnMount() {}
  // componentDidUpdate(prevProps, prevState, snapshot):该方法在getSnapshotBeforeUpdate方法之后被调用，有三个参数prevProps，prevState，snapshot，表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的,如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态。
  componentDidUpdate() {}
  // 渲染组件函数
  render() {}
  // 以下函数不建议使用
  UNSAFE_componentWillMount() {}
  UNSAFE_componentWillUpdate(nextProps, nextState) {}
  UNSAFE_componentWillReceiveProps(nextProps) {}
}
/**
 * @description: 函数定义组件（Function Component）代码更简洁，一看就知道是纯展示型的，没有复杂的业务逻辑
更好的复用性。只要传入相同结构的 props，就能展示相同的界面，不需要考虑副作用。
打包体积小，执行效率高
 * @param {type}
 * @return:
 */
import react from "react";
export const app = props => {
  let { firstName, lastName } = props;
  return (
    <div>
      <img src="avatar.png" className="profile" />
      <h3>{[firstName, lastName].join(" ")}</h3>
    </div>
  );
};
/**
 * @description:装载阶段
constructor -> getDerivedStateFromProps -> render -> componentDidMount
更新阶段
getDerivedStateFromProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate
卸载阶段
componenWillUnMount
 * @param {type}
 * @return:
 */
/**
 * @description:
 * react15.3 中新加了一个类 PureComponent，前身是 PureRenderMixin ，和 Component 基本一样，只不过会在 render 之前帮组件自动执行一次 shallowEqual（浅比较），
 * 来决定是否更新组件，浅比较类似于浅复制，只会比较第一层。使用 PureComponent 相当于省去了写 shouldComponentUpdate 函数，当组件更新时，如果组件的 props 和 state：
引用和第一层数据都没发生改变， render 方法就不会触发，这是我们需要达到的效果。
虽然第一层数据没变，但引用变了，就会造成虚拟 DOM 计算的浪费。
第一层数据改变，但引用没变，会造成不渲染，所以需要很小心的操作数据。
 * @param {type}
 * @return:
 */
/**
 * @description: constructor(props)
 * 在构造函数中，一般就做两件事情：

初始化state

在构造函数中初始化state需直接赋值，不能调用 this.setState() 方法。
constructor()是唯一能够让你直接给 this.state 赋值的地方，可能有同学会说可以在构造函数外(跟constructor同级)直接给 state 赋值，
确实，因为 state 派生自 Component 或者 PureComponent 模块，在外层直接赋值，其实是在给基类中的 state 赋值，而在 constructor() 使用 this.state = {...} 进行初始化，
实际指的是当前组件这个实例。以下两种赋值方法均可：class TestContainer extends PureComponent {

    state = {
        content:"1"     //先执行
    }
s
    constructor(props){
        super(props);
        this.state={
            content:"2" //后执行，最终 this.state.content 为 2
        }
    }
    。。。
}
绑定方法：this.handleClick = this.handleClick.bind(this);
我所认为的是：在构造函数中进行方法的绑定后，在使用的时候可以减少匿名方法的产生，进而提高性能。
如果不需要初始化state，或者绑定方法，那么可以不用实现constructor(props)。
如果实现了这个方法，那么应当在方法体的最开始调用  super(props)，否则会导致 this.props 为 undefined 的问题。
不应在该方法中进行"事件的订阅/引入有side-effects的方法"。（这种应该放在 componentDidßßßßMount() 中）
 * @param {type} 
 * @return: 
 */
/**
 * @description:getDerivedStateFromProps
 * 周期函数的作用是根据props初始化或更新state，
 * 有两个参数分别是nextProps(本次渲染的props)和prevState(当前组件的state)，
 * 判断nextProps和prevState对应的属性是否相同，返回需要更改的state。
 * 该方法的应用场景：使组件能够根据父组件传入的 props 来更新其自身的 state
目前 props 和 state 的更新均会触发该方法。
该方法的两个入参，分别表示：
props：父组件传入的值。可能重命名为 nextProps 更为直观。
state：组件自身的state，相当于 this.state，可能重命名为 prevState 更好理解。
该方法在调用 render() 方法前被触发。
如果父组件的state进行了更新，那么其子组件也会触发 getDerivedStateFromProps() 方法。
使用该方法的时候需要初始化 state，否则在控制台中会出现警告信息，如下图：
使用该方法，需要在该方法中返回一个：对象/null：
如果返回的是对象，则会更新 state。
如果返回的是null，则表示不更新。
该方法用于取代：componentWillReceiveProps(nextProps) 生命周期函数。
getDerivedStateFromProps(props, state) 和 componentWillReceiveProps(nextProps) 的差异：
componentWillReceiveProps(props, state)：仅在父组件更新时触发。
getDerivedStateFromProps(props, state)：除了父组件更新，其自身的state更新时也会触发。
该方法无法访问组件的实例，换句话说，不能在该方法内部，调用 this.state，this.myFunction() 等实例对象/方法。

 * @param {type}
 * @return:
 */
// https://juejin.im/post/5c0e1583e51d45780317b32a 详细介绍15和16的异同
/**
 * @description:getSnapshotBeforeUpdate(prevProps, prevState)
getSnapshotBeforeUpdate(prevProps, prevState) 会在组件更新之前获取一个 snapshot，并可以将计算得的值或从 DOM 得到的信息传递到 
componentDidUpdate(prevProps, prevState, snapshot) 函数的第三个参数，常常用于 scroll 位置定位等场景
 * @param {type}
 * @return:
 */
/**
 * @description:fiber
 * @param {type}把渲染/更新过程（递归diff）拆分成一系列小任务，
 * 每次检查树上的一小部分，做完看是否还有时间继续下一个任务，
 * 有的话继续，没有的话把自己挂起，主线程不忙的时候再继续。
 * https://zhuanlan.zhihu.com/p/58863799
 * @return:
 */

/**
 * @description:react 15和16的不同点
 * @param {type}
 * 1.render可以返回字符串，数组，数字.
 * React elements, 数组和Fragments，Portal，String/numbers，boolean/null。
 * Error boundary（错误边界）
 * Fragment 组件其作用是可以将一些子元素添加到 DOM tree 上且不需要为这些元素提供额外的父节点，相当于 render 返回数组元素。
 * @return:
 */

/**
 * @description:Hooks 要解决的是状态逻辑复用问题，且不会产生 JSX 嵌套地狱，其特性如下：
多个状态不会产生嵌套，依然是平铺写法；
Hooks 可以引用其他 Hooks；
更容易将组件的 UI 与状态分离；
 * @param {type}
 * @return:
 */
