import React, { Component } from "react";
import { ajax } from "../../utils/http";
import { Table } from "antd";
import qs from "querystring";

export default class list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: []
    };
  }
  componentDidMount() {
    this.postlist();
    this.get();
    this.mockData();
  }

  mockData() {
    let data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        key: i,
        b: i + 1,
        a: "Lake Park",
        decisiona: "C",
        decisionb: 2035,
        x: "Lake Street 42",
        y: "SoftLake Co",
        m: "testm",
        n: "testn",
        blank: "testblank",
        decisionc: "1"
      });
    }
    const columns = [
      {
        title: "状态类别",
        children: [
          {
            title: "",
            dataIndex: "blank",
            key: "number",
            width: 100
            // rowSpan: [1, 2]
          },
          {
            title: "a",
            dataIndex: "a",
            key: "a",
            width: 100,
            rowSpan: [[3, 5]]
          },
          {
            title: "b",
            dataIndex: "b",
            key: "b",
            width: 100
            // rowSpan: [[0, 2], [3, 5]]
          }
        ]
      },
      {
        title: "类别指标",
        children: [
          {
            title: "x",
            dataIndex: "x",
            key: "x",
            width: 200
          },
          {
            title: "y",
            dataIndex: "y",
            key: "y"
          }
        ]
      },
      {
        title: "决策类别",
        children: [
          {
            title: "",
            dataIndex: "decisionc",
            key: "decisionc",
            width: 200
            // rowSpan: [[0, 2], [3, 5]]
          },
          {
            title: "a",
            dataIndex: "decisiona",
            key: "street",
            width: 200
            // rowSpan: [[0, 2], [6, 8]]
          },
          {
            title: "b",
            dataIndex: "decisionb",
            key: "building",
            width: 100
          }
        ]
      },
      {
        title: "目标值",
        children: [
          {
            title: "m",
            dataIndex: "m",
            key: "m",
            width: 200
          },
          {
            title: "n",
            dataIndex: "n",
            key: "n",
            width: 100
          }
        ]
      }
    ];
    const newColumns = columns.map(item => {
      return {
        title: item.title,
        children: item.children.map(_item => {
          if (_item.rowSpan) {
            return {
              title: _item.title,
              dataIndex: _item.dataIndex,
              key: _item.key,
              width: 100,
              render: (value, row, index) => {
                const obj = {
                  children: value,
                  props: {}
                };
                _item.rowSpan.forEach(element => {
                  if (index === element[0]) {
                    obj.props.rowSpan = element[1] - element[0] + 1;
                  }
                  // 此时判断剩下多少行为0;
                  for (let i = element[0] + 1; i < element[1] + 1; i++) {
                    if (index === i) {
                      obj.props.rowSpan = 0;
                    }
                  }
                });
                // if (index === _item.rowSpan[0]) {
                //   obj.props.rowSpan = _item.rowSpan[1];
                // }
                // if (index === 2) {
                //   obj.props.rowSpan = 4;
                // }
                // if (index === 3) {
                //   obj.props.rowSpan = 0;
                // }
                // if (index === 4) {
                //   obj.props.rowSpan = 0;
                // }
                // if (index === 5) {
                //   obj.props.rowSpan = 0;
                // }
                return obj;
              }
            };
          }
          return {
            title: _item.title,
            dataIndex: _item.dataIndex,
            key: _item.key,
            width: 100
            // rowSpan: 0
          };
        })
      };
    });
    console.log(newColumns);
    this.setState({
      data,
      columns: newColumns
    });
  }
  postlist() {
    const data = {
      title: "foo",
      body: "bar",
      userId: 1
    };
    ajax({
      api: "/posts",
      method: "post",
      data,
      timeout: 15000
    })
      .then(res => {
        console.log(res, "post");
        return res;
      })
      .then(res => {
        // console.log(res, "我要执行get");
        // this.get();
      });
  }
  get() {
    ajax({
      api: "/posts/1",
      method: "get",
      timeout: 15000
    }).then(res => {
      console.log(res, "get");
    });
  }
  render() {
    const { columns, data } = this.state;
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          // size="middle"
          // scroll={{ x: "130%", y: 240 }}
        />
      </div>
    );
  }
}
