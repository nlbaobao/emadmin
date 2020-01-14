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
  InputNumber,
  Select,
  Pagination,
  DatePicker,
  Popover,
  Tooltip
} from "antd";
import { ajax } from "../../utils/index";
import moment from "moment";
import "./index.less";
const { Option } = Select;
export class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isUser: false,
      page: 1,
      size: 10,
      total: 1,
      dataSource: [],
      type: "1",
      userArr: [],
      productsArr: [],
      editId: ""
    };

    this.columns = [
      {
        title: "优惠卷名称",
        dataIndex: "discountName",
        key: "discountName"
      },
      {
        title: "优惠券金额",
        dataIndex: "discountValue",
        key: "discountValue"
      },
      {
        title: "最低使用金额",
        dataIndex: "discountMinAmount",
        key: "discountMinAmount"
      },
      {
        title: "开始时间",
        dataIndex: "discountStartTime",
        key: "discountStartTime",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="long-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "结束时间",
        dataIndex: "discountEndTime",
        key: "discountEndTime",
        render: (text, record) => {
          return (
            <Tooltip placement="topLeft" title={record.discountEndTime}>
              <span className="long-title">{record.discountEndTime}</span>
            </Tooltip>
          );
        }
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
        dataIndex: "operate",
        key: "operate",
        render: (text, record) => {
          const { status } = record;
          return (
            <div style={{ cursor: "pointer" }} className="all-operate">
              <span
                onClick={() => {
                  this.setState(
                    {
                      type: "2",
                      visible: true,
                      editId: record.id
                    },
                    () => {
                      this.getUserlist();
                      this.getProduclist();
                      this.getDiscountById(record.id);
                    }
                  );
                }}
              >
                修改
              </span>
              <Divider type="vertical" />
              <span
                onClick={() => {
                  this.deleteDiscount(record.id);
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
                      this.downAwayDiscount(record.id);
                    }}
                  >
                    下架
                  </span>
                </span>
              ) : null}
              {status === 3 || status === 4 ? (
                <span>
                  <Divider type="vertical" />
                  <span
                    span
                    onClick={() => {
                      this.putAwayDiscount(record.id);
                    }}
                  >
                    上架
                  </span>
                </span>
              ) : null}
            </div>
          );
        }
      }
    ];
  }
  componentDidMount() {
    this.discountList();
  }
  //优惠卷列表
  discountList = () => {
    const { page, size } = this.state;
    ajax({
      method: "postJson",
      data: {
        page,
        size
      },
      api: "discountList"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total
        });
      } else {
        message.error(res.msg);
      }
    });
  };
  //修改优惠卷
  getDiscountById = discountId => {
    const { form } = this.props;
    ajax({
      method: "post",
      data: {
        discountId
      },
      api: "getDiscountById"
    }).then(res => {
      if (res.code === 200) {
        const {
          limitUserType,
          discountName,
          discountEndTime,
          discountStartTime,
          discountValue,
          discountMinAmount,
          userIds,
          productIds
        } = res.data;
        this.setState(
          {
            isUser: userIds ? true : false
          },
          () => {
            form.setFieldsValue({
              discountEndTime: moment(discountEndTime),
              discountStartTime: moment(discountStartTime),
              limitUserType,
              discountName,
              discountValue,
              discountMinAmount,
              userIds: userIds && userIds.split(","),
              productIds: productIds && productIds.split(",")
            });
          }
        );
      } else {
        message.error(res.msg);
      }
    });
  };

  //xia架优惠卷
  putAwayDiscount = discountId => {
    ajax({
      method: "post",
      data: {
        discountId
      },
      api: "putAwayDiscount"
    }).then(res => {
      if (res.code === 200) {
        message.success("上架成功");
        this.discountList();
      } else {
        message.error(res.msg);
      }
    });
  };
  //shang架优惠卷
  downAwayDiscount = discountId => {
    ajax({
      method: "post",
      data: {
        discountId
      },
      api: "downAwayDiscount"
    }).then(res => {
      if (res.code === 200) {
        message.success("下架成功");
        this.discountList();
      } else {
        message.error(res.msg);
      }
    });
  };
  //删除优惠卷
  deleteDiscount = discountId => {
    ajax({
      method: "post",
      data: {
        discountId
      },
      api: "deleteDiscount"
    }).then(res => {
      if (res.code === 200) {
        message.success("删除成功");
        this.discountList();
      } else {
        message.error(res.msg);
      }
    });
  };
  //新增优惠卷
  saveDiscount = values => {
    ajax({
      method: "postJson",
      data: values,
      api: "saveDiscount"
    }).then(res => {
      if (res.code === 200) {
        message.success("保存成功");
        this.discountList();
        this.setState({
          visible: false
        });
      } else {
        message.error(res.msg);
      }
    });
  };
  // 获取用户列表
  getUserlist = () => {
    ajax({
      method: "postJson",
      data: {},
      api: "allUserList"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          userArr: res.data
        });
      } else {
        message.error(res.msg);
      }
    });
  };
  getProduclist = () => {
    ajax({
      method: "postJson",
      data: {},
      api: "getAllProductList"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          productsArr: res.data
        });
      } else {
        message.error(res.msg);
      }
    });
  };
  //获取商品列表破
  handleSave = () => {
    const { form } = this.props;
    const { isUser, editId } = this.state;
    const rules = [];
    form.validateFields((err, values) => {
      console.log(values, "values");
      // startTime: moment(startTime),
      // endTime: moment(endTime),
      values.discountStartTime = values.discountStartTime.format(
        "YYYY-MM-DD HH:mm:ss"
      );
      values.discountEndTime = values.discountEndTime.format(
        "YYYY-MM-DD HH:mm:ss"
      );
      isUser ? (values.userIds = values.userIds.join()) : null;
      values.productIds = values.productIds.join();
      editId && (values.id = editId);
      if (!err) {
        this.saveDiscount(values);
      }
    });
  };
  render() {
    const {
      isUser,
      total,
      dataSource,
      page,
      type,
      visible,
      userArr,
      size,
      productsArr,
      searchText
    } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const userArrOpition = userArr.map(item => {
      return <Option key={item.id}>{item.wechatName}</Option>;
    });
    const producOpition = productsArr.map(item => {
      return <Option key={item.id}>{item.title}</Option>;
    });
    return (
      <div className="banner-list">
        <Button
          style={{ marginBottom: 20 }}
          type="primary"
          onClick={() => {
            this.setState({
              visible: true,
              isUser: false,
              editId: ""
            });
            this.getUserlist();
            this.getProduclist();
            const {
              discountEndTime,
              discountStartTime,
              limitUserType,
              discountName,
              discountValue,
              discountMinAmount
            } = {};
            form.setFieldsValue({
              discountEndTime,
              discountStartTime,
              limitUserType,
              discountName,
              discountValue,
              discountMinAmount,
              userIds: [],
              productIds: []
            });
          }}
        >
          新增
        </Button>
        <div style={{ marginBottom: 20 }}>
          <Row gutter={24}>
            <Col span={7}>
              <span style={{ marginRight: 20 }}>优惠卷名称:</span>
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
              <span style={{ marginRight: 20 }}>优惠卷金额:</span>
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
              <span style={{ marginRight: 20 }}>状态:</span>
              <Select
                // value={searchStatus}
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
            <Col span={3}>
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
          rowKey="id"
        />
        <Pagination
          onChange={e => {
            this.setState(
              {
                page: e
              },
              () => {
                this.discountList();
              }
            );
          }}
          current={page}
          pageSize={size}
          total={total}
        />
        <Drawer
          title={type === "1" ? "新增优惠卷" : "修改优惠卷"}
          width={720}
          onClose={() => {
            this.setState({
              visible: false
            });
          }}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="优惠券名称">
                  {getFieldDecorator("discountName", {
                    rules: [{ required: true, message: "优惠券名称必填项" }]
                  })(<Input placeholder="请填写优惠券名称" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="优惠券金额">
                  {getFieldDecorator("discountValue", {
                    rules: [{ required: true, message: "优惠券金额必填项" }]
                  })(
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="请填写优惠券金额"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="开始时间">
                  {getFieldDecorator("discountStartTime", {
                    rules: [{ required: true, message: "开始时间是必选项" }]
                  })(
                    <DatePicker
                      renderExtraFooter={() => ""}
                      style={{ width: "100%" }}
                      placeholder="选择开始时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="结束时间">
                  {getFieldDecorator("discountEndTime", {
                    rules: [{ required: true, message: "结束时间是必选项" }]
                  })(
                    <DatePicker
                      renderExtraFooter={() => ""}
                      style={{ width: "100%" }}
                      placeholder="选择结束时间"
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="优惠卷类型">
                  {getFieldDecorator("limitUserType", {
                    rules: [{ required: true, message: "优惠卷类型是必选项" }]
                  })(
                    <Select
                      onChange={e => {
                        this.setState({
                          isUser: e === "2"
                        });
                      }}
                      placeholder="请填写类型"
                    >
                      <Option value="1">全平台发放</Option>
                      <Option value="2">指定用户发放</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="最低使用金额">
                  {getFieldDecorator("discountMinAmount", {
                    rules: [{ required: true, message: "最低使用金额是必填项" }]
                  })(
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="请填写最低使用金额"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="关联商品">
                  {getFieldDecorator("productIds", {
                    rules: [{ required: true, message: "关联商品必选项" }]
                  })(
                    <Select mode="multiple" placeholder="请填写关联商品">
                      {producOpition}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              {isUser ? (
                <Col span={12}>
                  <Form.Item label="关联用户">
                    {getFieldDecorator("userIds", {
                      rules: [{ required: true, message: "用户是必选项" }]
                    })(
                      <Select mode="multiple" placeholder="请选择关联用户">
                        {userArrOpition}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              ) : null}
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
              onClick={this.handleSave}
              style={{ marginRight: 8 }}
              style={{ marginRight: 8 }}
            >
              确定
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  visible: false
                });
              }}
              type="primary"
            >
              取消
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
export default Form.create()(Coupon);
