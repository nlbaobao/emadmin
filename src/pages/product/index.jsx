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
  Popover,
  Tooltip,
  Upload,
  Icon,
  Radio
} from "antd";
import { ajax, uuid } from "../../utils/index";
import RichText from "../../components/richText";
import Sku from "../../components/sku";
import { observer, inject } from "mobx-react";
import config from "../../components/config";
import Comments from "./comment";
import moment from "moment";
import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "./index.less";
const { Option } = Select;
@inject("PublicStatus")
@observer
export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      page: 1,
      size: 10,
      brandList: [],
      CatTotalList: [],
      skuData: [],
      commentsData: [],
      productId: "",
      detail: "",
      imgList: [],
      total: 0,
      fileList: [],
      editorContent: ""
    };
    this.imgIp = config.config.imgIp;
    this.columns = [
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
        title: "商品名称",
        dataIndex: "title",
        key: "title",
        render: text => {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span className="long-title">{text}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "价格",
        dataIndex: "price",
        key: "price"
      },
      {
        title: "开始时间",
        dataIndex: "startTime",
        key: "startTime",
        render: (text, record) => {
          return (
            <Tooltip placement="topLeft" title={record.startTime}>
              <span className="long-title">{record.startTime}</span>
            </Tooltip>
          );
        }
      },
      {
        title: "结束时间",
        dataIndex: "endTime",
        key: "endTime",
        render: (text, record) => {
          return (
            <Tooltip placement="topLeft" title={record.endTime}>
              <span className="long-title">{record.endTime}</span>
            </Tooltip>
          );
        }
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
                  this.setState({
                    visible: true,
                    type: "2",
                    productId: record.id
                  });
                  this.getProductById(record.id);
                  this.getbrandList();
                  this.getCatTotalList();
                  this.updateProduct(record);
                }}
              >
                修改
              </span>
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
              {status === 4 || status === 3 ? (
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
              {/* <Divider type="vertical" />
              <span
                span
                onClick={() => {
                  this.setState({
                    type: "3",
                    visible: true,
                    productId: record.id
                  });
                  this.getProductCommentListPage(record.id, 1, 10);
                }}
              >
                评论列表
              </span> */}
            </div>
          );
        }
      }
    ];
    this.child = () => {};
  }
  componentDidMount() {
    this.getProductListPage();
  }
  //图片上传
  handleChange = info => {
    let fileList = [...info.fileList];
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
  //品牌列表
  getbrandList = () => {
    const { page, size } = this.state;
    ajax({
      method: "postJson",
      data: {},
      api: "brandList"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          brandList: res.data.list
        });
      } else {
        message.error(res.msg);
      }
    });
  };
  getCatTotalList = () => {
    ajax({
      method: "postJson",
      data: {},
      api: "catTotalList"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          CatTotalList: res.data
        });
      } else {
        message.error(res.msg);
      }
    });
  };
  getProductListPage = () => {
    const { page, size } = this.state;
    ajax({
      method: "postJson",
      data: {
        page,
        size
      },
      api: "productListPage"
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
  //修改商品
  updateDtailUrl = value => {
    this.setState({
      detail: value
    });
  };
  updateEditorContent = value => {
    this.setState({
      editorContent: value
    });
  };
  //转换html
  transformHtmlToDraftState = (html = "") => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    return EditorState.createWithContent(contentState);
  };
  updateProduct = record => {
    const { form } = this.props;
    const {
      startTime,
      image,
      endTime,
      title,
      price,
      productCatId,
      productBannerId,
      showFlag,
      highVipPrice,
      juniorVipPrice
    } = record;
    this.setState({
      fileList:
        image &&
        image.split(",").map((item, index) => {
          return {
            uid: uuid(),
            name: item,
            status: "done",
            url: this.imgIp + item
          };
        })
    });
    form.setFieldsValue({
      startTime: moment(startTime),
      endTime: moment(endTime),
      title,
      price,
      productCatId,
      productBannerId,
      showFlag,
      highVipPrice,
      juniorVipPrice
    });
  };
  saveProduct = () => {
    const { form } = this.props;
    const {
      skuData,
      fileList,
      editorContent,
      detail,
      productId,
      type
    } = this.state;
    let image = "";
    if (fileList.length !== 0) {
      image = fileList.map(item => item.url).join(",");
    } else {
      message.info("至少上传一张图片");
      return;
    }
    form.validateFields((err, values) => {
      if (!err) {
        values.startTime = values.startTime.format("YYYY-MM-DD HH:mm:ss");
        values.endTime = values.endTime.format("YYYY-MM-DD HH:mm:ss");
        values.detail = editorContent || draftToHtml(detail);
        values.image = image.replace("http://zxy.world:9998/wx/", "");
        console.error(this.state);
        values.productSkuList = skuData;
        type === "2" ? (values.id = productId) : null;
        ajax({
          method: "postJson",
          data: values,
          api: "saveProduct"
        }).then(res => {
          if (res.code === 200) {
            this.setState({
              visible: false
            });
            this.getProductListPage();

            message.success(res.msg);
          } else {
            message.error(res.msg);
          }
        });
      }
    });
  };
  //更新sku

  updateSku = data => {
    this.setState({
      skuData: data
    });
  };

  // 获取sku的列表
  getProductById = productId => {
    ajax({
      method: "postJson",
      data: { productId },
      api: "getProductById"
    }).then(res => {
      if (res.code === 200) {
        this.child.editSkuData(res.data.productSkuList);
        const { detail } = res.data || "";
        this.setState({
          detail: this.transformHtmlToDraftState(detail),
          skuData: res.data.productSkuList
        });
      } else {
        message.error(res.msg);
      }
    });
  };
  //删除商品
  deleteProduct = productId => {
    ajax({
      method: "postJson",
      data: { productId },
      api: "deleteProduct"
    }).then(res => {
      if (res.code === 200) {
        this.getProductListPage();
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };
  //上架商品
  upProduct = productId => {
    ajax({
      method: "postJson",
      data: { productId },
      api: "putAwayProduct"
    }).then(res => {
      if (res.code === 200) {
        this.getProductListPage();
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };
  //下架商品
  downProduct = productId => {
    ajax({
      method: "postJson",
      data: { productId },
      api: "downProduct"
    }).then(res => {
      if (res.code === 200) {
        this.getProductListPage();
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };

  renderTitle = () => {
    const { type } = this.state;
    if (type === "1") {
      return "新增商品";
    }
    if (type === "2") {
      return "修改商品";
    }
    if (type === "3") {
      return "评论列表";
    }
  };

  render() {
    const {
      dataSource,
      visible,
      total,
      page,
      detail,
      imgList,
      commentsData,
      type,
      brandList,
      CatTotalList,
      size,
      editorContent,
      productId,
      fileList,
      searchText,
      searchStatus
    } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const props = {
      name: "file",
      action: "http://zxy.world:9998/fileUpload",
      headers: {
        authorization: "authorization-text"
      },
      multiple: "true",
      listType: "picture",
      onChange: this.handleChange
    };
    const brandListOption = brandList.map(item => {
      return <Option value={item.id}>{item.title}</Option>;
    });
    const catTotalListOption = CatTotalList.map(item => {
      return <Option value={item.id}>{item.catName}</Option>;
    });
    return (
      <div className="banner-list">
        <Button
          style={{ marginBottom: 20 }}
          onClick={() => {
            this.setState({
              visible: true,
              type: "1",
              detail: this.transformHtmlToDraftState(""),
              fileList: [],
              skuData: []
            });
            setTimeout(() => {
              this.child.editSkuData([]);
            }, 0);
            this.getbrandList();
            this.getCatTotalList();
            this.setState({});
            form.setFieldsValue({
              startTime: null,
              endTime: null,
              title: undefined,
              price: undefined,
              productCatId: undefined,
              productBannerId: undefined,
              showFlag: undefined,
              highVipPrice: undefined,
              juniorVipPrice: undefined
            });
          }}
        >
          新增
        </Button>
        <Row style={{ marginBottom: 20 }} gutter={24}>
          <Col span={7}>
            <span style={{ marginRight: 20 }}>商品名称:</span>
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

          {/* <Col span={7}>
            <span style={{ marginRight: 20 }}>会员等级:</span>
            <Select
              value={searchStatus}
              onChange={e => {
                this.setState({
                  level: e
                });
              }}
              style={{ width: 200 }}
              allowClear
            >
              <Option key="0">一级会员</Option>
              <Option key="1">二级会员</Option>
              <Option key="2">三级会员</Option>
            </Select>
          </Col> */}
          <Col span={7}>
            <span style={{ marginRight: 20 }}>商品状态:</span>
            <Select
              value={searchStatus}
              onChange={e => {
                this.setState({
                  status: e
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
                this.getList();
              }}
            >
              搜索
            </Button>
          </Col>
        </Row>
        <Table
          rowKey="id"
          style={{ marginBottom: 20 }}
          pagination={false}
          dataSource={dataSource}
          columns={this.columns}
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
          className="product-drawer"
          title={this.renderTitle()}
          width={1200}
          onClose={() => {
            this.setState({
              visible: false
            });
          }}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          {type === "3" ? (
            <Comments
              data={commentsData}
              productId={productId}
              getProductCommentListPage={this.getProductCommentListPage}
            />
          ) : (
            <Form layout="vertical" hideRequiredMark>
              <Row>
                <Form.Item label="标题">
                  {getFieldDecorator("title", {
                    rules: [{ required: true, message: "请输入商品标题" }]
                  })(<Input style={{ width: "100%" }} />)}
                  {getFieldDecorator("id", {})(<Input type="hidden" />)}
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="商品价格">
                  {getFieldDecorator("price", {
                    rules: [{ required: true, message: "请输入商品价格" }]
                  })(<Input />)}
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="是否首页展示">
                  {getFieldDecorator("showFlag", {
                    rules: [{ required: true, message: "请选择是否首页展示" }]
                  })(
                    <Radio.Group>
                      <Radio value={1}>是</Radio>
                      <Radio value={2}>否</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="初级会员价">
                  {getFieldDecorator("juniorVipPrice", {
                    rules: [{ required: true, message: "请输入初级会员价" }]
                  })(<Input />)}
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="高级会员价">
                  {getFieldDecorator("highVipPrice", {
                    rules: [{ required: true, message: "请输入高级会员价格" }]
                  })(<Input />)}
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="商品分类">
                  {getFieldDecorator("productCatId", {
                    rules: [{ required: true, message: "商品分类是必选项" }]
                  })(
                    <Select
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {catTotalListOption}
                    </Select>
                  )}
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="商品品牌">
                  {getFieldDecorator("productBannerId", {
                    rules: [{ required: true, message: "商品品牌是必选项" }]
                  })(
                    <Select
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {brandListOption}
                    </Select>
                  )}
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="SKU">
                  <Row>
                    <Sku
                      type={type}
                      onRef={e => {
                        this.child = e;
                      }}
                      updateSku={this.updateSku}
                    />
                  </Row>
                </Form.Item>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label="上架开始时间">
                    {getFieldDecorator("startTime", {
                      rules: [{ required: true, message: "请输入上架开始时间" }]
                    })(
                      <DatePicker
                        renderExtraFooter={() => ""}
                        style={{ width: "100%" }}
                        placeholder="选择开始时间"
                        format="YYYY-MM-DD HH:mm:ss"
                        format="YYYY-MM-DD HH:mm:ss"
                        showTime
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="上架结束时间">
                    {getFieldDecorator("endTime", {
                      rules: [{ required: true, message: "请输如上架结束时间" }]
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
              <Row>
                <Form.Item label="主图">
                  <Upload {...props} fileList={fileList}>
                    <Button>
                      <Icon type="upload" />
                      上传主图
                    </Button>
                  </Upload>
                </Form.Item>
              </Row>
              <Row>
                <Form.Item label="详情">
                  <RichText
                    detail={detail}
                    updateDtailUrl={this.updateDtailUrl}
                    editorContent={editorContent}
                    updateEditorContent={this.updateEditorContent}
                  />
                </Form.Item>
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
            <Button
              onClick={() => {
                if (type === "3") {
                  this.setState({
                    visible: false
                  });
                } else {
                  this.saveProduct();
                }
              }}
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
export default Form.create()(Product);
