import React, { Component } from "react";

import { Table, Input, Button, Popconfirm, Form, Popover } from "antd";
import ImgUpload from "./imgUpload";
import config from "./config";
import "./index.less";

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title}是必填项`
            }
          ],
          initialValue: record[dataIndex]
        })(
          <Input
            style={{ width: "100%" }}
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    // skuNo,totalStock,saleStock,saleStock,salePrice,stockPrice,stockPrice,viewSales,realSales,commission,imageUrlsku
    this.columns = [
      {
        title: "skuNo",
        dataIndex: "skuNo",
        width: "8%",
        editable: true
      },
      {
        title: "sku标题",
        dataIndex: "skuTitle",
        width: "8%",
        editable: true
      },
      {
        title: "初级会员价",
        dataIndex: "juniorVipPrice",
        width: "8%",
        editable: true
      },
      {
        title: "高级会员价",
        dataIndex: "highVipPrice",
        width: "8%",
        editable: true
      },
      {
        title: "是否免邮",
        dataIndex: "ifFreeShippingStr",
        width: "8%",
        editable: true
      },
      {
        title: "真实库存",
        dataIndex: "totalStock",
        width: "8%",
        editable: true
      },
      {
        title: "销售库存",
        dataIndex: "saleStock",
        width: "8%",
        editable: true
      },
      {
        title: "销售价格",
        dataIndex: "salePrice",
        width: "8%",
        editable: true
      },
      {
        title: "成本价",
        dataIndex: "stockPrice",
        width: "8%",
        editable: true
      },
      {
        title: "模拟销量",
        dataIndex: "viewSales",
        width: "8%",
        editable: true
      },
      {
        title: "真实销量",
        dataIndex: "realSales",
        width: "8%",
        editable: true
      },
      {
        title: "佣金",
        dataIndex: "commission",
        width: "8%",
        editable: true
      },
      {
        title: "图片",
        dataIndex: "imageUrl",
        width: "12%",
        render: (text, record) => {
          const { dataSource } = this.state;
          const { imgIp } = config.config;
          const content = (
            <img
              style={{ width: 100, height: 100 }}
              src={imgIp + record.imageUrl}
            />
          );
          return (
            <div style={{ textAlign: "center" }} className="sku-upload">
              {record.imageUrl.length === 0 ? null : (
                <Popover content={content} title="sku图片">
                  <img
                    style={{ width: 20, height: 20 }}
                    src={imgIp + record.imageUrl}
                  />
                </Popover>
              )}
              {record.imageUrl.length === 0 ? (
                <ImgUpload
                  uplaodType="sku"
                  record={record}
                  updateImg={this.updateImg}
                  dataSource={dataSource}
                />
              ) : null}
            </div>
          );
        }
      },
      {
        title: "操作",
        width: "12%",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="确认删除吗?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>删除</a>
            </Popconfirm>
          ) : null
      }
    ];

    this.state = {
      dataSource: [],
      count: 0
    };
  }
  componentDidMount() {
    const { onRef } = this.props;
    onRef(this);
  }
  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      skuNo: "1",
      skuTitle: "标题",
      juniorVipPrice: 0,
      highVipPrice: 0,
      ifFreeShippingStr: "否",
      totalStock: 0,
      saleStock: 0,
      salePrice: 0,
      stockPrice: 0,
      viewSales: 0,
      realSales: 0,
      commission: 0,
      imageUrl: ""
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  };
  updateImg = data => {
    this.setState({
      dataSource: data
    });
  };

  handleSave = row => {
    const { updateSku } = this.props;
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData }, () => {
      //调用保存接口
    });
    updateSku(newData);
  };
  //编辑的时候

  editSkuData = data => {
    console.log(data, "editSkuData");
    this.setState({
      dataSource:
        data &&
        data.map((item, count) => {
          return {
            key: count,
            productId: item.productId,
            skuNo: item.skuNo,
            totalStock: item.totalStock,
            saleStock: item.saleStock,
            salePrice: item.salePrice,
            stockPrice: item.stockPrice,
            viewSales: item.viewSales,
            realSales: item.realSales,
            commission: item.commission,
            imageUrl: item.imageUrl,
            status: item.status,
            skuTitle: item.skuTitle,
            juniorVipPrice: item.juniorVipPrice,
            highVipPrice: item.highVipPrice,
            ifFreeShippingStr: item.ifFreeShippingStr
          };
        })
    });
  };

  render() {
    const { dataSource } = this.state;
    const { type } = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          添加sku
        </Button>
        <Table
          style={{ width: 2000 }}
          pagination={false}
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          rowKey="id"
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}
export default EditableTable;
