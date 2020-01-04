import React, { Component } from 'react';
import { message, Button, Table, Divider, Drawer, Form, Col, Row, Input, Select, Pagination } from 'antd';
import { ajax } from '../../utils/index';
import './index.less';

export class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    // {
    //   "activityId": 0,
    //   "activityImg": "string",
    //   "activityUrl": "string",
    //   "createDate": "2019-12-26T13:57:06.296Z",
    //   "endDate": "2019-12-26T13:57:06.296Z",
    //   "modifyDate": "2019-12-26T13:57:06.296Z",
    //   "startDate": "2019-12-26T13:57:06.296Z",
    //   "status": "string",
    //   "userId": 0
    // }
    this.columns = [
      {
        title: 'activityImg',
        dataIndex: 'activityImg',
        key: 'activityImg',
      },
      {
        title: 'activityUrl',
        dataIndex: 'activityUrl',
        key: 'activityUrl',
      },
      {
        title: '开始时间',
        dataIndex: 'startDate',
        key: 'startDate',
      },
      {
        title: '结束时间',
        dataIndex: 'endDate',
        key: 'endDate',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => {
          const { status } = record;
          return (
            <div style={{ cursor: 'pointer' }} className="all-operate">
              <span onClick={() => {}}>修改</span>
              <Divider type="vertical" />
              <span
                onClick={() => {
                  this.deleteProduct(record.id);
                }}
              >
                删除
              </span>
              {status === 2 ? (
                <span>
                  <Divider type="vertical" />
                  <span
                    span
                    onClick={() => {
                      this.downProduct(record.id);
                    }}
                  >
                    下架
                  </span>
                </span>
              ) : null}
              {status === 4 ? (
                <span>
                  <Divider type="vertical" />
                  <span
                    span
                    onClick={() => {
                      this.upProduct(record.id);
                    }}
                  >
                    上架
                  </span>
                </span>
              ) : null}
            </div>
          );
        },
      },
    ];
  }
  componentDidMount() {
    this.activityList();
  }
  //活动列表
  activityList = () => {
    const { page, size } = this.state;
    ajax({
      method: 'postJson',
      data: {
        page,
        size,
      },
      api: 'activityList',
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total,
        });
      } else {
        message.error('获取商品列表失败');
      }
    });
  };
  //修改活动
  updateActivity = () => {
    const { page, size } = this.state;
    ajax({
      method: 'postJson',
      data: {
        page,
        size,
      },
      api: 'updateActivity',
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total,
        });
      } else {
        message.error('获取商品列表失败');
      }
    });
  };
  //保存活动
  saveActivity = () => {
    const { page, size } = this.state;
    ajax({
      method: 'postJson',
      data: {
        page,
        size,
      },
      api: 'saveActivity',
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total,
        });
      } else {
        message.error('获取商品列表失败');
      }
    });
  };
  //删除活动
  deleteActivity = () => {
    const { page, size } = this.state;
    ajax({
      method: 'postJson',
      data: {
        page,
        size,
      },
      api: 'deleteActivity',
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total,
        });
      } else {
        message.error('获取商品列表失败');
      }
    });
  };
  //上架活动
  putActivity = () => {
    const { page, size } = this.state;
    ajax({
      method: 'postJson',
      data: {
        page,
        size,
      },
      api: 'putActivity',
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total,
        });
      } else {
        message.error('获取商品列表失败');
      }
    });
  };
  //下架活动
  downActivity = () => {
    const { page, size } = this.state;
    ajax({
      method: 'postJson',
      data: {
        page,
        size,
      },
      api: 'downActivity',
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total,
        });
      } else {
        message.error('获取商品列表失败');
      }
    });
  };
  handleSave = () => {
    const { form } = this.props;
    const { type } = this.state;

    form.validateFields((err, values) => {
      if (!err) {
        this.save(values);
      }
    });
  };
  render() {
    const { dataSource, visible, type, searchStatus, searchText } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="banner-list">
        <Button
          style={{ marginBottom: 20 }}
          type="primary"
          onClick={() => {
            this.setState({
              visible: true,
            });
          }}
        >
          新增
        </Button>
        <div style={{ marginBottom: 20 }}>
          <Row gutter={24}>
            <Col span={10}>
              <span style={{ marginRight: 20 }}>内容:</span>
              <Input
                value={searchText}
                onChange={e => {
                  this.setState({
                    searchText: e.target.value,
                  });
                }}
                style={{ width: 200 }}
              ></Input>
            </Col>
            <Col span={10}>
              <span style={{ marginRight: 20 }}>状态:</span>
              <Select
                value={searchStatus}
                onChange={e => {
                  this.setState({
                    searchStatus: e,
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
            <Col span={4}>
              <Button
                type="primary"
                onClick={() => {
                  this.getList(searchStatus, searchText);
                }}
              >
                搜索
              </Button>
            </Col>
          </Row>
        </div>
        <Table style={{ marginBottom: 20 }} pagination={false} dataSource={dataSource} columns={this.columns} />
        <Pagination defaultCurrent={6} total={500} />
        <Drawer
          title={type === '1' ? '新增' : '修改'}
          width={720}
          onClose={() => {
            this.setState({
              visible: false,
            });
          }}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.handleSave} style={{ marginRight: 8 }} style={{ marginRight: 8 }}>
              确定
            </Button>
            <Button type="primary">取消</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
export default Form.create()(Activity);
