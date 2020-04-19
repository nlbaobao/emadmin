import React, { Component } from 'react';
import { message, Button, Table, Form, Col, Row, Select, Pagination, Popover, Tooltip } from 'antd';
import config from './config';
import moment from 'moment';
import Item from 'antd/lib/list/Item';
const { Option } = Select;
const list = [
  {
    pid: 1,
    num: 12,
    numSaled: 4,
  },
  {
    pid: 2,
    num: 32,
    numSaled: 12,
  },
  {
    pid: 1,
    num: 22,
    numSaled: 5,
  },
  {
    pid: 2,
    num: 33,
    numSaled: 20,
  },
];
export class Algo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custData: [], // 所有 商户数据
      allPrid: [],
      allPrice: [],
      renderData: [], //新的烟
    };
  }
  componentDidMount() {
    this.handleData();
  }
  //处理数据
  handleData = () => {
    // this.noRepeat(config.data);
    this.noRepeat1(config.data);
    const a = this.niubi(config.data, 'prId', ['need']);
    console.log(a, 'a');
    this.setState({
      allPrice: a.map((item) => {
        return {
          prId: item.prId,
          need: parseInt(item.need),
          prName: item.prName,
        };
      }),
    });
  };

  noRepeat1 = (arr) => {
    //const nameArr = arr.map(item=>item.name)
    //const norePeatArr = [...new Set(nameArr)]

    let store = [];
    let newArr = [];
    let sprid = [];
    let prid = [];
    arr.forEach((item) => {
      if (store.indexOf(item.custCode) === -1) {
        newArr.push(item);
        store.push(item.custCode);
      }
      if (sprid.indexOf(item.prId) === -1) {
        prid.push(item);
        sprid.push(item.prId);
      }
    });
    console.log(sprid);
    this.setState({
      custData: newArr,
      prId: sprid,
    });
  };

  //   noRepeat = (arr) => {
  //     let obj = {};
  //     let newArr = [];
  //     debugger;
  //     arr.forEach((item) => {
  //       obj[item.custCode] = item;
  //     });
  //     for (item in obj) {
  //       newArr.push(obj[item]);
  //     }
  //     this.setState({
  //       custData: newArr,
  //     });
  //     return newArr;
  //   };
  select = (e) => {
    const filterData = config.data.filter((item) => item.custCode === e).map((ele) => ele.prId);
    let ids = [];
    this.state.prId.forEach((item) => {
      if (filterData.indexOf(item) === -1) {
        ids.push(item);
      }
    });
    this.findMax(ids);
  };
  //找出103中数量最多的前三个

  findMax = (ids) => {
    const { allPrice } = this.state;
    let newArr = [];
    allPrice.forEach((item) => {
      if (ids.indexOf(item.prId) > -1) {
        newArr.push(item);
      }
    });
    newArr.sort(this.compare('need'));
    newArr.splice(0, newArr.length - 3);
    this.setState({
      renderData: newArr,
    });
    console.log(ids, newArr, '1111111111');
  };

  niubi = (arr, item, list) => {
    //数组去除重复，item为重复判定项，list为重复记录需要累加的值的数组
    var obj = {};
    var a = [];
    for (var i in arr) {
      if (!obj[arr[i][item]]) {
        obj[arr[i][item]] = this.copyObj(arr[i]); //数组克隆
      } else if (!!obj[arr[i][item]]) {
        for (var j in list) {
          obj[arr[i][item]][list[j]] = parseInt(obj[arr[i][item]][list[j]]) + parseInt(arr[i][list[j]]);
        }
      }
    }
    for (var k in obj) {
      a.push(obj[k]);
    }
    return a;
  };

  copyObj = (obj) => {
    //obj arr 对象的克隆（区分于指针赋值）
    if (obj.constructor == Array) {
      var a = [];
      for (var i in obj) {
        a.push(obj[i]);
      }
      return a;
    } else {
      var o = {};
      for (var i in obj) {
        o[i] = obj[i];
      }
      return o;
    }
  };

  compare = (type) => {
    return function (a, b) {
      var value1 = a[type];
      var value2 = b[type];
      return value1 - value2;
    };
  };

  render() {
    const { custData, renderData } = this.state;
    return (
      <div style={{ display: 'flex' }} className="wrap">
        <div className="box1">
          所有商户({custData.length})个:
          <Select onChange={this.select} style={{ width: '100%' }}>
            {custData.map((item) => {
              return <Option value={item.custCode}>{item.custName}</Option>;
            })}
          </Select>
        </div>
        <div className="box2">
          <ul>
            {renderData.map((item) => {
              return <li key={item.prid}>{item.prName}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}
export default Algo;
