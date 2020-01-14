import React, { Component } from "react";
import {
  message,
  Popover,
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
  Upload,
  Icon
} from "antd";
import { ajax, uuid } from "../../utils/index";
import "./index.less";
import config from "../../components/config";
const { Option } = Select;
export class ProductBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      dataSource: [],
      cats: [],
      page: 1,
      size: 10,
      visible: false,
      type: "1", // 1代表新增
      total: 0,
      fileList: []
    };
    this.columns = [
      {
        title: "标题",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "icon",
        dataIndex: "icon",
        key: "icon",
        render: (text, record) => {
          const content = (
            <img
              style={{ width: 100, height: 100 }}
              src={config.config.imgIp + record.icon}
            />
          );
          return (
            <Popover content={content} title="icon">
              <img
                style={{ width: 20, height: 20 }}
                src={config.config.imgIp + record.icon}
              />
            </Popover>
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
          const { status, id } = record;
          return (
            <div>
              <span
                onClick={() => {
                  this.setState({
                    visible: true,
                    type: "2"
                  });
                  this.showDetail(id);
                }}
              >
                修改
              </span>
              <Divider type="vertical" />
              <span
                onClick={() => {
                  this.delete(id);
                }}
              >
                删除
              </span>
              {status === 3 || status === 4 ? (
                <span>
                  <Divider type="vertical" />
                  <span
                    onClick={() => {
                      this.handlePut(id);
                    }}
                  >
                    上架
                  </span>
                </span>
              ) : null}
              {status === 2 ? (
                <span>
                  {" "}
                  <Divider type="vertical" />
                  <span
                    onClick={() => {
                      this.handleDown(id);
                    }}
                  >
                    下架
                  </span>
                </span>
              ) : null}
            </div>
          );
        }
      }
    ];
    this.imgIp = config.config.imgIp;
  }
  componentDidMount() {
    this.getList();
    this.getTotalCat();
  }
  delete = id => {
    ajax({
      method: "postJson",
      data: {
        id: id
      },
      api: "deleteBrand"
    }).then(res => {
      if (res.code === 200) {
        this.getList();
        message.success("删除成功");
      } else {
        message.error("删除失败");
      }
    });
  };
  showDetail = record => {
    ajax({
      method: "postJson",
      data: {
        id: record
      },
      api: "brand"
    }).then(res => {
      if (res.code === 200) {
        this.props.form.setFieldsValue({
          title: res.data.title,
          id: res.data.id,
          parentCatId: res.data.parentCatId
        });
        const { icon } = res.data;
        this.setState({
          id: record,
          fileList:
            icon &&
            [icon].map((item, index) => {
              console.log(icon);
              return {
                uid: uuid(),
                name: item,
                status: "done",
                url: this.imgIp + item
              };
            })
        });
      } else {
        message.error("获取品牌失败");
      }
    });
  };
  getTotalCat = () => {
    ajax({
      method: "postJson",
      api: "getCatTotalList"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          cats: res.data
        });
      } else {
        message.error("获取品牌下拉列表失败");
      }
    });
  };
  getList = () => {
    const { page, size, searchStatus, searchText } = this.state;
    ajax({
      method: "postJson",
      data: {
        status: searchStatus,
        title: searchText,
        page,
        size
      },
      api: "brandList"
    }).then(res => {
      if (res.code === 200) {
        this.setState({
          dataSource: res.data.list,
          total: res.data.total
        });
      } else {
        message.error("获类目列表失败");
      }
    });
  };
  save = values => {
    values.id = this.state.id;
    ajax({
      method: "postJson",
      data: values,
      api: "saveBrand"
    }).then(res => {
      if (res.code === 200) {
        this.getList();
        this.setState({
          visible: false,
          fileList: []
        });
        message.success("保存成功.");
        this.props.form.setFieldsValue({
          title: "",
          id: "",
          parentCatId: ""
        });
      } else {
        message.error("保存失败");
      }
    });
  };
  handlePut = id => {
    var that = this;
    ajax({
      method: "postJson",
      data: {
        id: id
      },
      api: "putBrand"
    }).then(res => {
      if (res.code === 200) {
        that.getList();
      } else {
        message.error("上架失败");
      }
    });
  };

  updateImg = data => {
    this.setState({
      PublicStatus: data
    });
  };
  handleDown = id => {
    var that = this;
    ajax({
      method: "postJson",
      data: {
        id: id
      },
      api: "downBrand"
    }).then(res => {
      if (res.code === 200) {
        that.getList();
      } else {
        message.error("下架失败");
      }
    });
  };
  handleSave = () => {
    const { form } = this.props;
    const { type, fileList } = this.state;
    let icon = "";
    if (fileList.length !== 0) {
      icon = fileList.map(item => item.url)[0];
    } else {
      message.info("至少上传一张图片");
      return;
    }
    form.validateFields((err, values) => {
      values.icon = icon;
      values.icon = icon && icon.replace("http://zxy.world:9998/wx/", "");
      if (!err) {
        this.save(values);
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
      type,
      searchStatus,
      searchText,
      page,
      size,
      fileList,
      total
    } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    console.log(fileList);
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
              <span style={{ marginRight: 20 }}>品牌名称:</span>
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
          rowKey="id"
        />
        <Pagination
          onChange={e => {
            this.setState(
              {
                page: e
              },
              () => {
                this.getList();
              }
            );
          }}
          current={page}
          pageSize={size}
          total={total}
        />
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
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="名称">
                  {getFieldDecorator("title", {
                    rules: [
                      {
                        required: true,
                        message: "名称"
                      }
                    ]
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="请输入品牌名"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Icon">
                  <Upload {...props} fileList={fileList}>
                    <Button>
                      <Icon type="upload" />
                      上传icon
                    </Button>
                  </Upload>
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
export default Form.create()(ProductBrand);
