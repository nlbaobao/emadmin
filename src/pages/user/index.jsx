import React, { Component } from "react";
import {
  message,
  Popover,
  Button,
  Table,
  Divider,
  Drawer,
  Form,
  Col,
  Row,
  Input,
  Select,
  Pagination
} from "antd";
import { ajax } from "../../utils/index";
import "./index.less";
export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      total: 1,
      page: 1,
      size: 10,
      visible: false,
      type: "1", // 1代表新增
      status: "",
      level: ""
    };
    this.columns = [
      {
        title: "昵称",
        dataIndex: "wechatName",
        key: "title"
      },
      {
        title: "icon",
        dataIndex: "wechatImage",
        key: "wechatImage",
        render: (text, record) => {
          const content = (
            <img style={{ width: 100, height: 100 }} src={record.wechatImage} />
          );
          return (
            <Popover content={content} title="icon">
              <img style={{ width: 40, height: 40 }} src={record.wechatImage} />
            </Popover>
          );
        }
      },
      {
        title: "最后登录时间",
        dataIndex: "lastLoginTime",
        key: "lastLoginTime"
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: s => {
          if (s == 2) {
            return "正常";
          } else if (s == 3) {
            return "禁用";
          } else {
            return "草稿";
          }
        }
      },
      {
        title: "操作",
        dataIndex: "id",
        key: "operate",
        render: record => {
          return (
            <div>
              <span
                onClick={() => {
                  this.handleDown(record);
                }}
              >
                禁用
              </span>
              <Divider type="vertical" />
              <span
                onClick={() => {
                  this.handlePut(record);
                }}
              >
                启用
              </span>
              <Divider type="vertical" />
              <span
                onClick={() => {
                  this.handlePut(record);
                }}
              >
                下级会员
              </span>
              <Divider type="vertical" />
              <span
                onClick={() => {
                  this.handlePut(record);
                }}
              >
                佣金明细
              </span>
              <Divider type="vertical" />
              <span
                onClick={() => {
                  this.handlePut(record);
                }}
              >
                提现记录
              </span>
            </div>
          );
        }
      }
    ];
  }
  componentDidMount() {
    this.getList();
  }
  getList = () => {
    var that = this;
    ajax({
      method: "postJson",
      data: {
        page: that.state.page,
        size: that.state.size,
        status: that.state.searchStatus,
        search: that.state.searchText
      },
      api: "userList"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total
        });
      } else {
        message.error("获取用户列表失败");
      }
    });
  };
  handlePut = id => {
    var that = this;
    ajax({
      method: "postJson",
      data: {
        userId: id
      },
      api: "enableUser"
    }).then(res => {
      if (res.code === 200) {
        that.getList();
      } else {
        message.error("操作失败，请稍后再试");
      }
    });
  };

  handleDown = id => {
    var that = this;
    ajax({
      method: "postJson",
      data: {
        userId: id
      },
      api: "disableUser"
    }).then(res => {
      if (res.code === 200) {
        that.getList();
      } else {
        message.error("操作失败，请稍后再试");
      }
    });
  };
  render() {
    const {
      dataSource,
      searchStatus,
      searchText,
      total,
      page,
      size,
      status,
      level
    } = this.state;
    return (
      <div className="banner-list">
        <div style={{ marginBottom: 20 }}>
          <Row gutter={24}>
            <Col span={7}>
              <span style={{ marginRight: 20 }}>昵称:</span>
              <Input
                value={searchText}
                onChange={e => {
                  this.setState({
                    searchText: e.target.value
                  });
                }}
                style={{ width: 200 }}
              ></Input>
            </Col>

            <Col span={7}>
              <span style={{ marginRight: 20 }}>会员等级:</span>
              <Select
                value={searchStatus}
                onChange={e => {
                  this.setState({
                    level: e
                  });
                }}
                style={{ width: 200 }}
                allowClear
              >
                <Option key="0">一级会员</Option>
                <Option key="1">二级会员</Option>
                <Option key="2">三级会员</Option>
              </Select>
            </Col>
            <Col span={7}>
              <span style={{ marginRight: 20 }}>用户状态:</span>
              <Select
                value={searchStatus}
                onChange={e => {
                  this.setState({
                    status: e
                  });
                }}
                style={{ width: 200 }}
                allowClear
              >
                <Option key="2">正常</Option>
                <Option key="3">禁用</Option>
                <Option key="4">草稿</Option>
              </Select>
            </Col>
            <Col span={3}>
              <Button
                type="primary"
                onClick={() => {
                  this.getList();
                }}
              >
                搜索
              </Button>
            </Col>
          </Row>
        </div>
        <Table
          style={{ marginBottom: 20 }}
          pagination={false}
          dataSource={dataSource}
          columns={this.columns}
        />
        <Pagination
          onChange={e => {
            this.setState(
              {
                page: e
              },
              () => {
                this.getList();
              }
            );
          }}
          current={page}
          pageSize={size}
          total={total}
        />
      </div>
    );
  }
}
export default Form.create()(User);
