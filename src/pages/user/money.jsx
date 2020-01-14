import React, { Component } from "react";
import {
  message,
  Button,
  Table,
  Divider,
  Drawer,
  Form,
  Col,
  Icon,
  Row,
  Upload,
  Input,
  Select,
  Pagination,
  Popover,
  Tooltip
} from "antd";
import moment from "moment";
import { ajax, uuid } from "../../utils/index";
import { observer, inject } from "mobx-react";
import config from "../../components/config";
import "./index.less";
const { Option } = Select;

@inject("PublicStatus")
@observer
export class Money extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      visible: false,
      dratype: "1", // 1代表新增
      searchType: "",
      status: "",
      page: 1,
      size: 10,
      total: 0,
      fileList: [],
      bannerId: ""
    };
    this.imgIp = config.config.imgIp;
    //   id   提现ID
    // userId   提现用户
    // withAmount  提现金额
    // payAccount  支付账户 -微信号|支付宝账号|银行账户
    // payType   支付类型 微信 支付宝 银行卡
    // rankName  开户行
    // realName   真实姓名
    // beforeWithAmount  提现前金额
    // afterWithAmount  提现后金额
    // createTime  申请提现时间

    this.columns = [
      {
        title: "提现用户",
        dataIndex: "userId",
        key: "userId",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="long-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "提现金额",
        dataIndex: "withAmount",
        key: "withAmount",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="long-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "支付类型",
        dataIndex: "payType",
        key: "payType",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="long-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "开户行",
        dataIndex: "rankName",
        key: "rankName",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="long-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "真实姓名",
        dataIndex: "realName",
        key: "realName",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="long-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "提现前金额",
        dataIndex: "beforeWithAmount",
        key: "beforeWithAmount"
      },
      {
        title: "提现后金额",
        dataIndex: "afterWithAmount",
        key: "afterWithAmount"
      },
      {
        title: "审核状态",
        dataIndex: "auditStatus",
        key: "auditStatus",
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
        title: "审核时间",
        dataIndex: "auditTime",
        key: "auditTime",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="long-title">{text}</span>
            </Tooltip>
          );
        }
      },

      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        render: (text, record) => {
          const { status } = record;
          return (
            <div style={{ cursor: "pointer" }}>
              {status === 2 ? (
                <span>
                  <Divider type="vertical" />
                  <span
                    span
                    onClick={() => {
                      // this.downActivity(record.id);
                    }}
                  >
                    通过
                  </span>
                </span>
              ) : null}
              {status === 3 || status === 4 ? (
                <span>
                  <Divider type="vertical" />
                  <span
                    span
                    onClick={() => {
                      // this.putActivity(record.id);
                    }}
                  >
                    不通过
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
    this.getList();
  }
  getList = () => {
    const { searchType, status, page, size } = this.state;
    ajax({
      method: "postJson",
      data: {
        type: searchType,
        status,
        page,
        size
      },
      api: "userWithDrawList"
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
  //  rejectUserWithDrawAudit
  userWithDrawAudit = auditId => {
    const { searchType, status, page, size } = this.state;
    ajax({
      method: "postJson",
      data: { auditId },
      api: "userWithDrawAudit"
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
        message.success("通过成功");
      } else {
        message.error(res.message);
      }
    });
  };
  rejectUserWithDrawAudit = auditId => {
    ajax({
      method: "postJson",
      data: { auditId },
      api: "rejectUserWithDrawAudit"
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
        message.success("拒绝成功");
      } else {
        message.error(res.message);
      }
    });
  };

  render() {
    const {
      dataSource,
      visible,
      dratype,
      searchText,
      status,
      fileList,
      page,
      size,
      total
    } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const props = {
      name: "file",
      action: "http://zxy.world:9998/fileUpload",
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
          <Row gutter={24} style={{ marginBottom: 20 }}>
            <Col span={8}>
              <span style={{ marginRight: 20 }}>标题:</span>
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
              <span style={{ marginRight: 20 }}>状态:</span>

              <Select
                allowClear
                value={status}
                onChange={e => {
                  this.setState({
                    status: e
                  });
                }}
                style={{ width: 200 }}
              >
                <Option key="2">正常</Option>
                <Option key="3">禁用</Option>
                <Option key="4">草稿</Option>
              </Select>
            </Col>
            <Col span={8}>
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
        />
        <Pagination
          onChange={e => {
            this.setState(
              {
                page: e
              },
              () => {
                this.getProductListPage();
              }
            );
          }}
          current={page}
          pageSize={size}
          total={total}
        />
        <Drawer
          title={dratype === "1" ? "新增banner" : "修改banner"}
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
            <Button style={{ marginRight: 8 }}>确定</Button>
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
export default Form.create()(Money);
