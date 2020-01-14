import React, { Component } from "react";
import {
  message,
  Button,
  Table,
  Form,
  Col,
  Row,
  Select,
  Pagination,
  Input,
  Tooltip,
  Drawer,
  Divider,
  Popover
} from "antd";
import moment from "moment";
import { ajax, uuid } from "../../utils/index";
import { observer, inject } from "mobx-react";
import config from "../../components/config";
import "./index.less";
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
@inject("PublicStatus")
@observer
export class OrderManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      visible: false,
      dratype: "1", // 1代表新增
      status: "",
      page: 1,
      size: 10,
      total: 0,
      imgList: [1, 2, 3, 4, 5, 6, 7],
      reason: "",
      orderStatus: "",
      messageObject: {}
    };
    this.imgIp = config.config.imgIp;
    this.columns = [
      {
        title: "订单编号",
        dataIndex: "orderId",
        key: "orderId",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="long-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "订单金额",
        dataIndex: "orderAmount",
        key: "orderAmount",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="long-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "支付金额",
        dataIndex: "orderPayAmount",
        key: "orderPayAmount"
      },
      {
        title: "优惠金额",
        dataIndex: "orderDiscountAmouont",
        key: "orderDiscountAmouont"
      },
      {
        title: "用户佣金",
        dataIndex: "orderUserMoneyAmount",
        key: "orderUserMoneyAmount"
      },
      {
        title: "物流单号",
        dataIndex: "logisticsNumber",
        key: "logisticsNumber"
      },
      {
        title: "付款时间",
        dataIndex: "createTime",
        key: "createTime",
        render: createTime => {
          return moment(createTime).format("YYYY-MM-DD HH:mm:ss");
        }
      },
      {
        title: "发货地址",
        dataIndex: "address",
        key: "address",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="long-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "订单状态",
        dataIndex: "orderStatus",
        key: "orderStatus",
        render: text => {
          let title = "";
          if (text === 1) {
            title = "待付款";
          }
          if (text === 2) {
            title = "待发货";
          }
          if (text === 3) {
            title = "待收货";
          }
          if (text === 4) {
            title = "待评价";
          }
          if (text === 5) {
            title = "已退款";
          }
          if (text === 6) {
            title = "已收货";
          }
          if (text === 7) {
            title = "订单完成";
          }
          if (text === 8) {
            title = "申请退款";
          }
          if (text === 9) {
            title = "退款失败";
          }
          return <span>{title}</span>;
        }
      },
      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        width: "15%",
        render: (text, record) => {
          const { orderStatus } = record;
          return (
            <span style={{ cursor: "pointer" }}>
              {orderStatus === 2 ? (
                <span
                  onClick={e => {
                    e.stopPropagation();
                    this.sendGoods(record.orderId);
                  }}
                >
                  发货
                  <Divider type="vertical" />
                </span>
              ) : null}
              {/*  */}
              {orderStatus === 5 || orderStatus === 8 || orderStatus === 9 ? (
                <span
                  span
                  onClick={e => {
                    e.stopPropagation();
                    this.setState({
                      visible: true
                    });
                    this.getDrawbackInfo(record.orderId);
                  }}
                >
                  退款原因
                </span>
              ) : null}
            </span>
          );
        }
      }
    ];
  }
  componentDidMount() {
    this.getorderList();
  }
  getorderList = () => {
    const { orderStatus, page, size } = this.state;
    ajax({
      method: "postJson",
      data: {
        orderStatus,
        page,
        size
      },
      api: "orderList"
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total
        });
      } else {
        message.error(res.message);
      }
    });
  };
  //查看退款原因
  getDrawbackInfo = orderId => {
    ajax({
      method: "postJson",
      data: { orderId },
      api: "getDrawbackInfo"
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
        this.setState({
          messageObject: res.data,
          imgList: res.data.image && res.data.image.splice(",")
        });
      } else {
        message.error(res.message);
      }
    });
  };
  //扩展表格
  expandedRowRender = (record, index, indent, expanded) => {
    const { orderDetailList } = record;
    const columns = [
      { title: "商品名称", dataIndex: "productTitle", key: "productTitle" },
      { title: "sku名称", dataIndex: "skuTitle", key: "skuTitle" },
      { title: "商品数量", dataIndex: "productNum", key: "productNum" },
      {
        title: "商品价格",
        dataIndex: "productPrice",
        key: "productPrice"
      },
      {
        title: "sku图片",
        dataIndex: "skuImage",
        key: "skuImage",
        render: (text, record) => {
          const content = (
            <img
              style={{ width: 100, height: 100 }}
              src={this.imgIp + record.skuImage}
            />
          );
          return (
            <Popover content={content} title="主图">
              <img
                style={{ width: 20, height: 20 }}
                src={this.imgIp + record.skuImage}
              />
            </Popover>
          );
        }
      }
    ];
    return (
      <Table
        columns={columns}
        rowKey="id"
        dataSource={orderDetailList || []}
        pagination={false}
      />
    );
  };
  //审核通过
  reviewPass = () => {};
  //审核拒绝
  reviewReject = () => {};
  sendGoods = orderId => {
    ajax({
      method: "postJson",
      data: { orderId },
      api: "sendGoods"
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
        message.success("发货成功");
        this.getorderList();
      } else {
        message.error(res.message);
      }
    });
  };

  render() {
    const {
      dataSource,
      visible,
      page,
      size,
      total,
      searchText,
      orderStatus,
      messageObject,
      imgList
    } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const props = {
      name: "file",
      action: "http://2hq8388555.goho.co/fileUpload",
      headers: {
        authorization: "authorization-text"
      },
      multiple: "false",
      listType: "picture",
      onChange: this.handleChange
    };
    return (
      <div className="banner-list">
        <div>
          <Row style={{ marginBottom: 20 }} gutter={24}>
            <Col span={7}>
              <span style={{ marginRight: 20 }}>订单编号:</span>
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
            <Col span={8}>
              <span style={{ marginRight: 20 }}>订单状态:</span>

              <Select
                allowClear
                value={orderStatus}
                onChange={e => {
                  this.setState({
                    orderStatus: e
                  });
                }}
                style={{ width: 200 }}
              >
                <Option key={1}>待付款</Option>
                <Option key={2}>待发货</Option>
                <Option key={3}>待收货</Option>
                <Option key={4}>待评价</Option>
                <Option key={5}>已退款</Option>
                <Option key={6}>已收货</Option>
                <Option key={7}>订单完成</Option>
                <Option key={8}>申请退款</Option>
                <Option key={9}>退款失败</Option>
              </Select>
            </Col>

            <Col span={4}>
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
          rowKey="id"
          expandedRowRender={this.expandedRowRender}
        />
        <Pagination
          onChange={e => {
            this.setState(
              {
                page: e
              },
              () => {
                this.getorderList();
              }
            );
          }}
          current={page}
          pageSize={size}
          total={total}
        />
        <Drawer
          title="审核窗口"
          width={720}
          onClose={() => {
            this.setState({
              visible: false
            });
          }}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          {/* 
          id   退款ID
orderId  退款订单ID
returnReason 退款理由
returnAmount 申请退款金额
returnDesc  退款原因描述
returnActualAmount  实际退款金额
createTime   申请退款时间
image  退款照片
          */}
          <Form {...formItemLayout}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="退款订单号">
                  <span>{messageObject.orderId}</span>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="退款理由">
                  <span>{messageObject.returnReason}</span>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="申请退款金额">
                  <span>{messageObject.returnAmount}</span>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="退款原因描述">
                  <span>{messageObject.returnDesc}</span>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="实际退款金额">
                  <span>{messageObject.returnActualAmount}</span>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="申请退款时间">
                  <span>{messageObject.createTime}</span>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <div style={{ marginBottom: 20, paddingLeft: 52 }}>退款照片:</div>
              {imgList &&
                imgList.map(item => {
                  return (
                    <Col style={{ marginBottom: 10 }} span={6}>
                      <img
                        style={{ width: 150, height: 150 }}
                        src={this.imgIp + item}
                        alt=""
                      />
                    </Col>
                  );
                })}
            </Row>
          </Form>
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
              style={{ marginRight: 20 }}
              onClick={() => {
                this.setState({
                  visible: false
                });
              }}
              type="primary"
            >
              通过
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  visible: false
                });
              }}
            >
              不通过
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
export default Form.create()(OrderManage);
