import React, { Component } from 'react';
import { message, Button, Table, Divider, Drawer, Form, Col, Row, Input, Select, Pagination } from 'antd';
import { ajax } from '../../utils/index';
import './index.less';

export class UserMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        { bannerContent: '1', bannerHref: '11111', status: '0' },
        { bannerContent: '1', bannerHref: '11111', status: '0' },
      ],
      visible: false,
      type: '1', // 1代表新增
      userWithDrawAuditStatus: '',
      userLevel: '',
      page: 1,
      size: 10,
    };
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'bannerContent',
        key: 'bannerContent',
      },
      {
        title: '注册时间',
        dataIndex: 'bannerHref',
        key: 'bannerHref',
      },
      {
        title: '最近登录时间',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '会员等级',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '完成订单数',
        dataIndex: 'status',
        key: 'status',
      },

      {
        title: '完成退款数',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '完成付款数',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: () => {
          return (
            <div>
              <span>启用禁用</span>
              <Divider type="vertical" />
              <span>地址列表</span>
            </div>
          );
        },
      },
    ];
  }
  componentDidMount() {
    this.getUserList();
  }
  getUserList = () => {
    const { userLevel, userWithDrawAuditStatus, page, size } = this.state;
    ajax({
      method: 'postJson',
      data: {
        userLevel,
        userWithDrawAuditStatus,
        page,
        size,
      },
      api: 'userList',
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
      } else {
        message.error('登录失败');
      }
    });
  };
  getChildList = () => {
    const { userLevel, userWithDrawAuditStatus, page, size } = this.state;
    ajax({
      method: 'postJson',
      data: {
        userLevel,
        userWithDrawAuditStatus,
        page,
        size,
      },
      api: 'userChildList',
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
      } else {
        message.error('登录失败');
      }
    });
  };
  getMoneyList = () => {
    const { userLevel, userWithDrawAuditStatus, page, size } = this.state;
    ajax({
      method: 'post',
      data: {
        userLevel,
        userWithDrawAuditStatus,
        page,
        size,
      },
      api: 'userMoneyLogList',
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
      } else {
        message.error('登录失败');
      }
    });
  };

  checkMoney = () => {
    const { userLevel, userWithDrawAuditStatus, page, size } = this.state;
    ajax({
      method: 'post',
      data: {
        userLevel,
        userWithDrawAuditStatus,
        page,
        size,
      },
      api: 'userWithDrawAudit',
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
      } else {
        message.error('登录失败');
      }
    });
  };
  MoneyRecord = () => {
    const { userLevel, userWithDrawAuditStatus, page, size } = this.state;
    ajax({
      method: 'post',
      data: {
        userLevel,
        userWithDrawAuditStatus,
        page,
        size,
      },
      api: 'userWithDrawList',
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
      } else {
        message.error('登录失败');
      }
    });
  };

  render() {
    const { userLevel, userWithDrawAuditStatus, visible, dataSource, type } = this.state;
    return (
      <div className="banner-list">
        <Row gutter={24}>
          <Col span={8}>
            {' '}
            <Form.Item label="会员等级">
              <Select
                value={userLevel}
                onChange={e => {
                  this.setState({
                    userLevel: e,
                  });
                }}
                style={{ width: 200 }}
              >
                <Option key="1">等级1</Option>
                <Option key="2">等级2</Option>
                <Option key="3">等级3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="状态">
              <Select
                value={userWithDrawAuditStatus}
                onChange={e => {
                  this.setState({
                    userWithDrawAuditStatus: e,
                  });
                }}
                style={{ width: 200 }}
              >
                <Option key="1">1</Option>
                <Option key="2">2</Option>
                <Option key="3">3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            {' '}
            <Form.Item label="搜索">
              <Button
                onClick={() => {
                  this.getUserList();
                }}
              >
                搜索
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Table style={{ marginBottom: 20 }} pagination={false} dataSource={dataSource} columns={this.columns} />
        <Pagination defaultCurrent={6} total={500} />
      </div>
    );
  }
}
export default UserMessage;
