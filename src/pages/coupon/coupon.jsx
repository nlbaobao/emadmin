import React, { Component } from 'react';
import { message, Button, Table, Divider, Drawer, Form, Col, Row, Input, Select, Pagination } from 'antd';
import { ajax } from '../../utils/index';
import './index.less';

export class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.columns = [
      {
        title: '标题',
        dataIndex: 'catName',
        key: 'title',
      },
      {
        title: 'icon',
        dataIndex: 'catIcon',
        key: 'icon',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
    ];
  }
  componentDidMount() {}

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
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="分类名">
                  {getFieldDecorator('catName', {
                    rules: [
                      {
                        required: true,
                        message: '分类名必填',
                      },
                    ],
                  })(<Input style={{ width: '100%' }} placeholder="请输入分类名" />)}
                </Form.Item>
                <Form.Item label="分类id">
                  {getFieldDecorator('id', {
                    rules: [{ required: false }],
                  })(<Input type="hidden"></Input>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="父分类">
                  {getFieldDecorator('parentCatId', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Select placeholder="请选择父分类">
                      {this.state.cats.map(name => (
                        <Option key={name.id}>{name.catName}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="分类id">
                  {getFieldDecorator('id', {
                    rules: [{ required: false }],
                  })(<Input type="hidden"></Input>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="分类Icon">
                  {getFieldDecorator('catIcon', {
                    rules: [
                      {
                        required: true,
                        message: '请选择图片',
                      },
                    ],
                  })(<Input style={{ width: '100%' }} placeholder="请输入图片链接" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
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
export default Form.create()(Coupon);
