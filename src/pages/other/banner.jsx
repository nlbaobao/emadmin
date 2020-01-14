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
export class Banner extends Component {
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
    this.columns = [
      {
        title: "banner标题",
        dataIndex: "bannerContent",
        key: "bannerContent",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="long-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "主图",
        dataIndex: "bannerImage",
        key: "bannerImage",
        render: (text, record) => {
          const content = (
            <img
              style={{ width: 100, height: 100 }}
              src={this.imgIp + record.bannerImage}
            />
          );
          return (
            <Popover content={content} title="主图">
              <img
                style={{ width: 20, height: 20 }}
                src={this.imgIp + record.bannerImage}
              />
            </Popover>
          );
        }
      },
      // {
      //   title: "内容",
      //   dataIndex: "bannerContent",
      //   key: "bannerContent"
      // },
      {
        title: "类型",
        dataIndex: "type",
        key: "type",
        render: text => {
          let title = "";
          if (text === 1) {
            title = "Banner";
          }
          if (text === 2) {
            title = "活动";
          }
          if (text === 3) {
            title = "公告";
          }
          return <span>{title}</span>;
        }
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        render: createTime => {
          return moment(createTime).format("YYYY-MM-DD HH:mm:ss");
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
            <div style={{ cursor: "pointer" }}>
              <span
                onClick={() => {
                  const {
                    bannerContent,
                    bannerImage,
                    bannerOrder,
                    bannerHref,
                    type,
                    status,
                    id
                  } = record;
                  const { form } = this.props;
                  this.setState({
                    visible: true,
                    dratype: "2",
                    bannerId: id,
                    fileList:
                      record.bannerImage &&
                      [bannerImage].map((item, index) => {
                        return {
                          uid: uuid(),
                          name: item,
                          status: "done",
                          url: this.imgIp + item
                        };
                      })
                  });
                  form.setFieldsValue({
                    bannerContent,
                    bannerImage,
                    bannerOrder,
                    bannerHref,
                    type: type.toString(),
                    status: status.toString()
                  });
                }}
              >
                修改
              </span>
              <Divider type="vertical" />
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.deletBanner(record.id);
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
                      // this.downActivity(record.id);
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
                      // this.putActivity(record.id);
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
      api: "bannerList"
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
  save = values => {
    ajax({
      method: "postJson",
      data: values,
      api: "addBanner"
    }).then(res => {
      if (res.code === 200) {
        message.success(res.msg);
        this.getList();
        this.setState({
          visible: false
        });
      } else {
        message.error(res.message);
      }
    });
  };
  deletBanner = bannerId => {
    ajax({
      method: "postJson",
      data: {
        id: bannerId
      },
      api: "deleteBanner"
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
        message.success(res.msg);
        this.getList();
      } else {
        message.error(res.message);
      }
    });
  };

  updateBnnaer = values => {
    ajax({
      method: "postJson",
      data: values,
      api: "updateBanner"
    }).then(res => {
      console.log(res);
      if (res.code === 200) {
        message.success(res.msg);
        this.getList();
        this.setState({
          visible: false
        });
      } else {
        message.error(res.message);
      }
    });
  };

  //creat或者update
  handleMessage = () => {
    const { form } = this.props;
    const { dratype, fileList, bannerId } = this.state;
    let bannerImage = "";
    if (fileList.length !== 0) {
      bannerImage = fileList.map(item => item.url)[0];
    } else {
      message.info("至少上传一张图片");
      return;
    }
    form.validateFields((err, values) => {
      values.bannerImage = bannerImage;
      values.bannerImage =
        bannerImage && bannerImage.replace("http://zxy.world:9998/wx/", "");
      if (!err) {
        if (dratype === "1") {
          this.save(values);
        }
        if (dratype === "2") {
          values.id = bannerId;
          this.updateBnnaer(values);
        }
      }
    });
  };
  handleChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.map(file => {
      if (file.response && file.response.code === 200) {
        const { name, path } = file.response.data[0];
        file.name = name;
        file.url = path;
      }
      return file;
    });
    this.setState({ fileList }, () => {
      console.log(this.state.fileList, "fileList");
    });
  };
  render() {
    const {
      dataSource,
      visible,
      dratype,
      searchType,
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
        <Button
          style={{ marginBottom: 20 }}
          onClick={() => {
            this.setState({
              visible: true,
              dratype: "1",
              fileList: []
            });
            const {
              bannerContent,
              bannerImage,
              bannerOrder,
              bannerHref,
              type,
              status
            } = {};
            form.setFieldsValue({
              bannerContent,
              bannerImage,
              bannerOrder,
              bannerHref,
              type,
              status
            });
          }}
        >
          新增
        </Button>
        <div>
          <Row gutter={24} style={{ marginBottom: 20 }}>
            <Col span={8}>
              <span style={{ marginRight: 20 }}>标题:</span>

              <Select
                allowClear
                value={searchType}
                onChange={e => {
                  this.setState({
                    searchType: e
                  });
                }}
                style={{ width: 200 }}
              >
                <Option key="1">Banner</Option>
                <Option key="2">活动</Option>
                <Option key="3">公告</Option>
              </Select>
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
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="banner内容">
                  {getFieldDecorator("bannerContent", {
                    rules: [{ required: true, message: "请填写banner内容" }]
                  })(<Input placeholder="请填写banner内容" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="上传banner">
                  <Upload {...props} fileList={fileList}>
                    <Button>
                      <Icon type="upload" />
                      上传banner
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="bannerOrder">
                  {getFieldDecorator("bannerOrder", {
                    rules: [{ required: true, message: "banner顺序是必选项" }]
                  })(
                    <Input style={{ width: "100%" }} placeholder="banner顺序" />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="跳转路径">
                  {getFieldDecorator("bannerHref", {
                    rules: [{ required: true, message: "跳转路径是必选项" }]
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请填写跳转路径"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="banner类型">
                  {getFieldDecorator("type", {
                    rules: [{ required: true, message: "类型是必选项" }]
                  })(
                    <Select placeholder="请填写类型">
                      <Option key={"1"}>Banner</Option>
                      <Option key={"2"}>活动</Option>
                      <Option key={"3"}>公告</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="banner状态">
                  {getFieldDecorator("status", {
                    rules: [{ required: true, message: "banner状态是必选项" }]
                  })(
                    <Select placeholder="请填写banner状态">
                      <Option key={"2"}>正常</Option>
                      <Option key={"3"}>禁用</Option>
                      <Option key={"4"}>草稿</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
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
            <Button onClick={this.handleMessage} style={{ marginRight: 8 }}>
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
export default Form.create()(Banner);
