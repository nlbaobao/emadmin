import React, { Component } from "react";
import {
  message,
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

export class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    // {
    //   "createTime": "2019-12-26T13:57:06.364Z",
    //   "discountEndTime": "2019-12-26T13:57:06.364Z",
    //   "discountMinAmount": 0,
    //   "discountName": "string",
    //   "discountStartTime": "2019-12-26T13:57:06.364Z",
    //   "discountValue": 0,
    //   "id": 0,
    //   "limitUserType": 0,
    //   "productIds": "string",
    //   "status": 0,
    //   "updateTime": "2019-12-26T13:57:06.364Z",
    //   "userIds": "string"
    // }
    this.columns = [
      {
        title: "优惠卷名称",
        dataIndex: "discountName",
        key: "discountName"
      },
      {
        title: "开始时间",
        dataIndex: "discountStartTime",
        key: "startDate"
      },
      {
        title: "结束时间",
        dataIndex: "endDate",
        key: "endDate"
      },
      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        render: (text, record) => {
          const { status } = record;
          return (
            <div style={{ cursor: "pointer" }} className="all-operate">
              <span onClick={() => {}}>修改</span>
              <Divider type="vertical" />
              <span
                onClick={() => {
                  this.deleteProduct(record.id);
                }}
              >
                删除
              </span>
            </div>
          );
        }
      }
    ];
  }
  componentDidMount() {}
  //公告列表
  noticeList = () => {
    const { page, size } = this.state;
    ajax({
      method: "postJson",
      data: {
        page,
        size
      },
      api: "noticeList"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total
        });
      } else {
        message.error("获取商品列表失败");
      }
    });
  };
  //修改公告
  updateNotice = () => {
    const { page, size } = this.state;
    ajax({
      method: "postJson",
      data: {
        page,
        size
      },
      api: "getDiscountById"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total
        });
      } else {
        message.error("获取商品列表失败");
      }
    });
  };
  //新增公告
  addNotice = () => {
    const { page, size } = this.state;
    ajax({
      method: "postJson",
      data: {
        page,
        size
      },
      api: "saveDiscount"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total
        });
      } else {
        message.error("获取商品列表失败");
      }
    });
  };
  //修改公告
  updateNotice = () => {
    const { page, size } = this.state;
    ajax({
      method: "postJson",
      data: {
        page,
        size
      },
      api: "updateNotice"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total
        });
      } else {
        message.error("获取商品列表失败");
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
              visible: true
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
                    searchText: e.target.value
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
                    searchStatus: e
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
        <Table
          style={{ marginBottom: 20 }}
          pagination={false}
          dataSource={dataSource}
          columns={this.columns}
        />
        <Pagination defaultCurrent={6} total={500} />
        <Drawer
          title={type === "1" ? "新增" : "修改"}
          width={720}
          onClose={() => {
            this.setState({
              visible: false
            });
          }}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Button
              onClick={this.handleSave}
              style={{ marginRight: 8 }}
              style={{ marginRight: 8 }}
            >
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
