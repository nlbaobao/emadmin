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
import config from "../../components/config";
import "./index.less";
const { Option } = Select;
export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      page: 1,
      size: 10,
      total: 0,
      fileList: [],
      dratype: "1",
      productsArr: [],
      visible: false
    };
    this.imgIp = config.config.imgIp;
    this.columns = [
      {
        title: "评论",
        dataIndex: "content",
        key: "content"
      },
      {
        title: "主图",
        dataIndex: "image",
        key: "image",
        render: (text, record) => {
          const content = (
            <img
              style={{ width: 100, height: 100 }}
              src={this.imgIp + record.image.split(",")[0]}
            />
          );
          return (
            <Popover content={content} title="主图">
              <img
                style={{ width: 20, height: 20 }}
                src={this.imgIp + record.image.split(",")[0]}
              />
            </Popover>
          );
        }
      },
      {
        title: "用户名",
        dataIndex: "createUseName",
        key: "createUseName"
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime"
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (text, record) => {
          let title = "";
          const num = record.status;
          if (num === 2) {
            title = "正常";
          }
          if (num === 3) {
            title = "禁用";
          }
          if (num === 4) {
            title = "草稿";
          }
          return <span>{title}</span>;
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
                  const { content, createUseName, productId } = record;
                  const { form } = this.props;
                  this.setState({
                    visible: true,
                    dratype: "2",
                    bannerId: id,
                    fileList:
                      record.image &&
                      image.map((item, index) => {
                        return {
                          uid: uuid(),
                          name: item,
                          status: "done",
                          url: this.imgIp + item
                        };
                      })
                  });
                  form.setFieldsValue({
                    content,
                    createUseName,
                    productId: productId.toString()
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
                      this.disableComment(record.id);
                    }}
                  >
                    禁用评论
                  </span>
                </span>
              ) : null}
              {status === 4 ? (
                <span>
                  <Divider type="vertical" />
                  <span
                    span
                    onClick={() => {
                      this.putAwayComment(record.id);
                    }}
                  >
                    上架评论
                  </span>
                </span>
              ) : null}
            </div>
          );
        }
      }
    ];
  }
  //获取评论列表
  getProductCommentListPage = () => {
    const { page, size } = this.state;
    ajax({
      method: "postJson",
      data: { page, size },
      api: "getProductCommentListPage"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          commentsData: res.data.list
        });
      } else {
        message.error(res.msg);
      }
    });
  };
  putAwayComment = productCommentId => {
    ajax({
      method: "postJson",
      data: { productCommentId },
      api: "putAwayComment"
    }).then(res => {
      if (res.code === 200) {
        message.success(res.msg);
        this.getProductCommentListPage();
      } else {
        message.error(res.msg);
      }
    });
  };
  disableComment = productCommentId => {
    ajax({
      method: "postJson",
      data: { productCommentId },
      api: "disableComment"
    }).then(res => {
      if (res.code === 200) {
        message.success(res.msg);
        this.getProductCommentListPage();
      } else {
        message.error(res.msg);
      }
    });
  };
  save = values => {
    ajax({
      method: "postJson",
      data: values,
      api: "saveComment"
    }).then(res => {
      if (res.code === 200) {
        message.success(res.msg);
        this.getProductCommentListPage();
        this.setState({
          visible: false
        });
      } else {
        message.error(res.message);
      }
    });
  };
  handleMessage = () => {
    const { form } = this.props;
    const { fileList } = this.state;
    let bannerImage = "";
    if (fileList.length !== 0) {
      bannerImage = fileList.map(item => item.url).join(",");
    } else {
      message.info("至少上传一张图片");
      return;
    }
    form.validateFields((err, values) => {
      values.image = bannerImage;
      values.image =
        bannerImage && bannerImage.replace("http://zxy.world:9998/wx/", "");
      if (!err) {
        this.save(values);
      }
    });
  };
  handleChange = info => {
    let fileList = [...info.fileList];
    // fileList = fileList.slice(-1);
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
  render() {
    const {
      page,
      size,
      total,
      fileList,
      productsArr,
      data,
      dratype,
      visible
    } = this.state;
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
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const producOpition = productsArr.map(item => {
      return <Option key={item.id}>{item.title}</Option>;
    });
    return (
      //  "content": "评论测试数据",   /必填
      // "createUseName": "测试用户",/必填
      // "productId": 15/必填
      // "image": "string"/非必填

      <div className="banner-list">
        <Button
          style={{ marginBottom: 20 }}
          type="primary"
          onClick={() => {
            this.setState({
              visible: true,
              dratype: "1",
              fileList: []
            });
            this.getProduclist();
            const { content, createUseName } = {};
            form.setFieldsValue({
              content,
              createUseName,
              productId: []
            });
          }}
        >
          新增
        </Button>
        <Table
          rowKey="id"
          style={{ marginBottom: 20 }}
          pagination={false}
          dataSource={data}
          columns={this.columns}
        />
        <Pagination
          onChange={e => {
            this.setState(
              {
                page: e
              },
              () => {
                this.getProductCommentListPage();
              }
            );
          }}
          current={page}
          pageSize={size}
          total={total}
        />
        <Drawer
          title={dratype === "1" ? "新增评论" : "修改评论"}
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
                <Form.Item label="评论内容">
                  {getFieldDecorator("content", {
                    rules: [{ required: true, message: "请填写评论内容" }]
                  })(<Input placeholder="请填写评论内容" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="上传图片">
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
                <Form.Item label="测试用户">
                  {getFieldDecorator("createUseName", {
                    rules: [{ required: true, message: "测试用户是必填" }]
                  })(
                    <Input style={{ width: "100%" }} placeholder="测试用户" />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="关联商品">
                  {getFieldDecorator("type", {
                    rules: [{ required: true, message: "类型是必选项" }]
                  })(
                    <Select mode="multiple" placeholder="请填写关联商品">
                      {producOpition}
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
export default Form.create()(Comments);
