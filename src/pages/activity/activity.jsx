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
  Pagination,
  DatePicker,
  Tooltip,
  InputNumber,
  Modal
} from "antd";
import { ajax } from "../../utils/index";
import moment from "moment";
import "./index.less";
const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;
export class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      drawerType: "1",
      page: 1,
      size: 10,
      total: 1,
      activityType: "", //活动类型
      productsArr: [],
      skuArr: [[]],
      appData: [], //
      applicationFlag: false,
      appPage: 1,
      appSize: 10,
      appTotal: 0,
      activityId: "",
      appStatus: undefined,
      activityProductList: [
        {
          productId: "",
          productPrice: "",
          productSpecialPrice: "",
          skuId: ""
        }
      ]
    };
    this.columns = [
      {
        title: "活动标题",
        dataIndex: "title",
        key: "title",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="little-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "开始时间",
        dataIndex: "startTime",
        key: "startTime",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="little-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "结束时间",
        dataIndex: "endTime",
        key: "endTime",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="little-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "活动描述",
        dataIndex: "desc",
        key: "desc",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="little-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "活动类型",
        dataIndex: "type",
        key: "type",
        render: text => {
          let title = "";
          if (text === 1) {
            title = "团购";
          }
          if (text === 2) {
            title = "限时特价";
          }
          if (text === 3) {
            title = "免费试用";
          }
          return <span>{title}</span>;
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
                      drawerType: "2",
                      visible: true,
                      applicationFlag: false
                    },
                    () => {
                      this.updateActivity(record.id);
                      this.getProduclist();
                    }
                  );
                }}
              >
                修改
              </span>
              <Divider type="vertical" />
              <span
                onClick={() => {
                  this.deleteActivity(record.id);
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
                      this.downActivity(record.id);
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
                      this.putActivity(record.id);
                    }}
                  >
                    上架
                  </span>
                </span>
              ) : null}

              <Divider type="vertical" />
              <span
                span
                onClick={() => {
                  this.setState(
                    {
                      applicationFlag: true,
                      visible: true,
                      activityId: record.id
                    },
                    () => {
                      this.applicationList();
                    }
                  );
                }}
              >
                申请列表
              </span>
            </div>
          );
        }
      }
    ];
    this.appColumns = [
      {
        title: "用户昵称",
        dataIndex: "username",
        key: "username",
        width: "8%",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="little-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "收货人",
        dataIndex: "receiver",
        width: "8%",
        key: "receiver",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="little-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "手机号",
        dataIndex: "phone",
        width: "8%",
        key: "phone",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="little-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "收货地址",
        dataIndex: "province",
        width: "8%",
        key: "province",
        render: (text, record) => {
          const { province, city, area } = record;
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="little-title">{province + city + area}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "申请内容",
        dataIndex: "trialContent",
        key: "trialContent",
        width: "10%",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="little-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "申请时间",
        dataIndex: "createTime",
        key: "createTime",
        width: "8%",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="little-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "审核时间",
        dataIndex: "updateTime",
        key: "updateTime",
        width: "8%",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="little-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "审核人",
        dataIndex: "auditBy",
        key: "auditBy",
        width: "8%",
        render: text => {
          return <span className="little-title">{text}</span>;
        }
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        width: "8%",
        render: text => {
          let title = "";
          if (text === 2) {
            title = "不通过";
          }
          if (text === 1) {
            title = "通过";
          }
          if (text === 0) {
            title = "未审核";
          }
          return <span className="little-title">{title}</span>;
        }
      },
      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        width: "12%",
        render: (text, record) => {
          const { status } = record;
          return (
            <span style={{ cursor: "pointer" }}>
              {status === 2 || status === 0 ? (
                <span
                  onClick={e => {
                    e.stopPropagation();
                    this.applyTryPass(record.id);
                  }}
                >
                  通过
                </span>
              ) : null}
              {status === 0 ? <Divider type="vertical" /> : null}
              {status === 1 || status === 0 ? (
                <span
                  onClick={e => {
                    e.stopPropagation();
                    this.applyTryReject(record.id);
                  }}
                >
                  不通过
                </span>
              ) : null}
            </span>
          );
        }
      }
    ];
  }

  componentDidMount() {
    this.activityList();
  }
  // 申请列表
  applicationList = () => {
    const { appPage, appSize, activityId, appStatus } = this.state;
    ajax({
      method: "postJson",
      data: {
        page: appPage,
        size: appSize,
        activityId,
        status: appStatus
      },
      api: "getActivityTryList"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          appData: res.data.list,
          appTotal: res.data.total
        });
      } else {
        message.error(res.msg);
      }
    });
  };
  //活动列表
  activityList = () => {
    const { page, size } = this.state;
    ajax({
      method: "postJson",
      data: {
        page,
        size
      },
      api: "activityList"
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
  //修改活动
  updateActivity = activityId => {
    const { form } = this.props;
    ajax({
      method: "postJson",
      data: {
        activityId
      },
      api: "updateActivity"
    }).then(res => {
      if (res.code === 200) {
        const {
          id,
          type,
          activityProductList,
          desc,
          endTime,
          startTime,
          title,
          userLimit
        } = res.data;
        this.setState(
          {
            id: id,
            activityType: type.toString(),
            activityProductList: activityProductList || [
              {
                productId: "",
                productPrice: "",
                productSpecialPrice: "",
                skuId: ""
              }
            ]
          },
          () => {
            this.state.activityProductList.forEach((item, index) => {
              this.getSkuArr(item.productId, index);
            });
            form.setFieldsValue({
              type: type.toString(),
              desc,
              id,
              endTime: moment(endTime),
              startTime: moment(startTime),
              userLimit: userLimit,
              title
            });
          }
        );
      } else {
        message.error("获取商品列表失败");
      }
    });
  };
  //保存活动
  saveActivity = values => {
    this.state.id && (values.id = this.state.id);
    ajax({
      method: "postJson",
      data: values,
      api: "saveActivity"
    }).then(res => {
      if (res.code === 200) {
        this.activityList();
        this.setState({
          visible: false
        });
      } else {
        message.error(res.msg);
      }
    });
  };
  //删除活动
  deleteActivity = activityId => {
    ajax({
      method: "postJson",
      data: { activityId },
      api: "deleteActivity"
    }).then(res => {
      if (res.code === 200) {
        message.success("删除成功");
        this.activityList();
      } else {
        message.error(res.msg);
      }
    });
  };
  //上架活动
  putActivity = activityId => {
    ajax({
      method: "postJson",
      data: { activityId },
      api: "putActivity"
    }).then(res => {
      if (res.code === 200) {
        message.success("上架成功");
        this.activityList();
      } else {
        message.error(res.msg);
      }
    });
  };
  //申请通过
  applyTryPass = tryId => {
    ajax({
      method: "postJson",
      data: { tryId },
      api: "applyTryPass"
    }).then(res => {
      if (res.code === 200) {
        message.success("通过成功");
        this.applicationList();
      } else {
        message.error(res.msg);
      }
    });
  };
  //拒绝申请
  applyTryReject = tryId => {
    ajax({
      method: "postJson",
      data: { tryId },
      api: "applyTryReject"
    }).then(res => {
      if (res.code === 200) {
        message.success("不通过成功");
        this.applicationList();
      } else {
        message.error(res.msg);
      }
    });
  };
  //下架活动
  downActivity = activityId => {
    ajax({
      method: "postJson",
      data: { activityId },
      api: "downActivity"
    }).then(res => {
      if (res.code === 200) {
        message.success("下架成功");
        this.activityList();
      } else {
        message.error(res.msg);
      }
    });
  };
  handleSave = () => {
    const { form } = this.props;
    const { activityProductList, activityType } = this.state;
    console.log(activityProductList, "activityProductList");
    const saveProductData = activityProductList.concat([]).map(item => {
      if (activityType === "1") {
        return {
          productId: item.productId,
          productPrice: item.productPrice,
          skuId: item.skuId
        };
      }
      if (activityType === "2") {
        return {
          productId: item.productId,
          productSpecialPrice: item.productSpecialPrice,
          skuId: item.skuId
        };
      }
      if (activityType === "3") {
        return {
          productId: item.productId,
          skuId: item.skuId
        };
      }
    });
    form.validateFields((err, values) => {
      if (!err) {
        values.activityProductList = saveProductData;
        values.startTime = values.startTime.format("YYYY-MM-DD HH:mm:ss");
        values.endTime = values.endTime.format("YYYY-MM-DD HH:mm:ss");
        console.log(values, "values");
        this.saveActivity(values);
      }
    });
  };
  // 切换活动的操作
  changeActivityType = e => {
    const { activityType } = this.state;
    if (activityType !== "") {
      confirm({
        title: "切换活动类型会清除你之前的绑定sku的操作谨慎操作",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk: () => {
          const { form } = this.props;
          form.setFieldsValue({
            type: e
          });
          this.setState({
            activityType: e,
            activityProductList: [
              {
                productId: "",
                productPrice: "",
                productSpecialPrice: "",
                skuId: ""
              }
            ]
          });
        },
        onCancel: () => {
          const { form } = this.props;
          const { activityType } = this.state;
          console.log(activityType, "activityType");
          form.setFieldsValue({
            type: activityType
          });
          this.setState({
            activityType
          });
        }
      });
    } else {
      const { form } = this.props;
      form.setFieldsValue({
        type: e
      });
      this.setState({
        activityType: e
      });
    }
  };
  //关联sku
  changeActivityProductList = (type, index) => {
    const { activityProductList } = this.state;
    if (activityProductList.length === 1 && type === "mins") {
      message.warning("新增活动至少关联一件商品");
      return;
    }
    if (type === "add") {
      activityProductList.push({
        productId: "",
        productPrice: "",
        productSpecialPrice: "",
        skuId: ""
      });
    } else {
      activityProductList.splice(index, 1);
    }
    this.setState({
      activityProductList
    });
  };
  //请求商品列表和sku列表
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
  getSkuArr = (productId, index) => {
    const { skuArr } = this.state;
    ajax({
      method: "postJson",
      data: { productId },
      api: "getAllProductSkuList"
    }).then(res => {
      if (res.code === 200) {
        skuArr[index] = res.data;
        this.setState({
          skuArr
        });
      } else {
        message.error(res.msg);
      }
    });
  };
  //更改sku
  changeValue = (index, value, valueType) => {
    const { activityType, activityProductList } = this.state;
    if (valueType === "productId") {
      activityProductList[index].productId = value;
    }
    if (valueType === "skuId") {
      activityProductList[index].skuId = value;
    }
    if (valueType === "price") {
      activityType === "1"
        ? (activityProductList[index].productPrice = value)
        : (activityProductList[index].productSpecialPrice = value);
    }
    this.setState({
      activityProductList
    });
  };
  render() {
    const {
      dataSource,
      visible,
      drawerType,
      activityType,
      activityProductList,
      productsArr,
      skuArr,
      page,
      size,
      total,
      appData,
      applicationFlag,
      appPage,
      appSize,
      appTotal,
      appStatus
    } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const producOpition = productsArr.map(item => {
      return <Option key={item.id.toString()}>{item.title}</Option>;
    });

    const productContent = activityProductList.map((item, index) => {
      const skuOpition =
        skuArr[index] &&
        skuArr[index].map(item => {
          return <Option key={item.skuNo}>{item.skuTitle}</Option>;
        });
      return (
        <div key={index} className="add-activity-sku">
          <Col span={7}>
            <span className="ac-title">关联商品</span>
            <Select
              value={item.productId.toString()}
              onChange={e => {
                this.changeValue(index, e, "productId");
                this.getSkuArr(e, index);
              }}
              showSearch
              filterOption={(input, option) =>
                option.props.children &&
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              placeholder="请选择商品"
            >
              {producOpition}
            </Select>
          </Col>
          <Col span={7}>
            <span className="ac-title">关联sku</span>
            <Select
              value={item.skuId.toString()}
              showSearch
              filterOption={(input, option) =>
                option.props.children &&
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              onChange={e => {
                this.changeValue(index, e, "skuId");
              }}
              placeholder="请选择sku"
            >
              {skuOpition}
            </Select>
          </Col>
          {activityType === "3" ? null : (
            <Col span={7}>
              <span className="ac-title">
                {activityType === "1" ? "商品团购价" : "商品特价"}
              </span>
              <InputNumber
                value={
                  activityType === "1"
                    ? item.productPrice
                    : item.productSpecialPrice
                }
                style={{ width: "100%" }}
                onChange={e => {
                  this.changeValue(index, e, "price");
                }}
                placeholder="请填写商品价格"
              />
            </Col>
          )}

          {/* <Col span={3}>
            <div className="ac-operate">
              <Icon
                onClick={() => {
                  this.changeActivityProductList("add", index);
                }}
                style={{
                  fontSize: 20,
                  cursor: "pointer"
                }}
                className="plus"
                type="plus-circle"
              />
              <Icon
                style={{
                  fontSize: 20,
                  marginLeft: 15,
                  cursor: "pointer"
                }}
                onClick={() => {
                  this.changeActivityProductList("mins", index);
                }}
                className="mins"
                type="minus-square"
              />
            </div>
          </Col> */}
        </div>
      );
    });
    const applicationContent = (
      <div>
        <Row style={{ marginBottom: 20 }} gutter={24}>
          <Col span={10}>
            <span style={{ marginRight: 20 }}>状态:</span>
            <Select
              value={appStatus}
              onChange={e => {
                this.setState({
                  appStatus: e
                });
              }}
              style={{ width: 200 }}
              allowClear
            >
              <Option value="0">未审核</Option>
              <Option value="1">通过</Option>
              <Option value="2">不通过</Option>
            </Select>
          </Col>
          <Col span={3}>
            <Button
              onClick={() => {
                this.applicationList();
              }}
              type="primary"
            >
              搜索{" "}
            </Button>
          </Col>
        </Row>
        <Table
          style={{ marginBottom: 20 }}
          pagination={false}
          dataSource={appData}
          columns={this.appColumns}
          rowKey="id"
        />
        <Pagination
          onChange={e => {
            this.setState(
              {
                appPage: e
              },
              () => {
                this.applicationList();
              }
            );
          }}
          current={appPage}
          pageSize={appSize}
          total={appTotal}
        />
      </div>
    );
    return (
      <div className="banner-list">
        <Button
          style={{ marginBottom: 20 }}
          type="primary"
          onClick={() => {
            const { type, desc, id, endTime, startTime, userLimit, title } = {};
            form.setFieldsValue({
              type,
              desc,
              id,
              endTime,
              startTime,
              userLimit,
              title
            });
            this.setState({
              visible: true,
              drawerType: "1",
              id: "",
              applicationFlag: false,
              activityType: "",
              activityProductList: [
                {
                  productId: "",
                  productPrice: "",
                  productSpecialPrice: "",
                  skuId: ""
                }
              ]
            });
            this.getProduclist();
          }}
        >
          新增
        </Button>
        <div style={{ marginBottom: 20 }}>
          <Row gutter={24}>
            <Col span={10}>
              <span style={{ marginRight: 20 }}>活动标题:</span>
              <Input
                // value={searchText}
                onChange={e => {
                  this.setState({
                    searchText: e.target.value
                  });
                }}
                style={{ width: 200 }}
              ></Input>
            </Col>
            <Col span={10}>
              <span style={{ marginRight: 20 }}>活动类型:</span>
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
                <Option value="1">团购</Option>
                <Option value="2">限时特价</Option>
                <Option value="3">免费试用</Option>
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
          rowKey="id"
        />
        <Pagination
          onChange={e => {
            this.setState(
              {
                page: e
              },
              () => {
                this.activityList();
              }
            );
          }}
          current={page}
          pageSize={size}
          total={total}
        />
        <Drawer
          title={
            applicationFlag
              ? "申请列表"
              : drawerType === "1"
              ? "新增活动"
              : "修改活动"
          }
          width={1200}
          onClose={() => {
            this.setState({
              visible: false
            });
          }}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          {applicationFlag ? (
            applicationContent
          ) : (
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="活动标题">
                    {getFieldDecorator("title", {
                      rules: [{ required: true, message: "活动标题必填项" }]
                    })(<Input placeholder="请填写活动标题" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="活动类型">
                    {getFieldDecorator("type", {
                      rules: [{ required: true, message: "活动类型是必选项" }]
                    })(
                      <Select
                        onChange={e => {
                          this.changeActivityType(e);
                        }}
                        placeholder="请选择活动类型"
                      >
                        <Option value="1">团购</Option>
                        <Option value="2">限时特价</Option>
                        <Option value="3">免费试用</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              {activityType === "" ? null : (
                <Row gutter={activityType === "3" ? 10 : 24}>
                  {productContent}
                </Row>
              )}
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="开始时间">
                    {getFieldDecorator("startTime", {
                      rules: [{ required: true, message: "开始时间是必选项" }]
                    })(
                      <DatePicker
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
                    {getFieldDecorator("endTime", {
                      rules: [{ required: true, message: "结束时间是必选项" }]
                    })(
                      <DatePicker
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
                <Col span={24}>
                  <Form.Item label="活动描述">
                    {getFieldDecorator("desc")(<TextArea rows={4} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  {activityType === "1" || activityType === "3" ? (
                    <Form.Item
                      label={`${
                        activityType === "1" ? "拼团限制人数" : "免费试用人数"
                      }`}
                    >
                      {getFieldDecorator("userLimit", {
                        rules: [
                          {
                            required: true,
                            message: `${
                              activityType === "1"
                                ? "拼团限制人数是必选项"
                                : "免费试是必选项"
                            }`
                          }
                        ]
                      })(
                        <InputNumber
                          style={{ width: "100%" }}
                          placeholder={`${
                            activityType === "1"
                              ? "请填写拼团限制人数"
                              : "请填写免费试用人数"
                          }`}
                        />
                      )}
                    </Form.Item>
                  ) : null}
                </Col>
              </Row>
            </Form>
          )}

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
            {applicationFlag ? null : (
              <Button onClick={this.handleSave} style={{ marginRight: 8 }}>
                确定
              </Button>
            )}

            <Button
              onClick={() => {
                this.setState({
                  visible: false,
                  applicationFlag: false
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
export default Form.create()(Activity);
