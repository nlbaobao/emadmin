import React, { Component } from "react";
import { message, Button, Table, Divider, Drawer, Form, Col, Row, Input, Select, Pagination, DatePicker } from 'antd';
import { ajax } from "../../utils/index";
import RichText from "../../components/richText"
import Sku from "../../components/sku"
import ImgUpload from '../../components/imgUpload'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import config from '../../components/config'
import Comments from './comment'
import moment from 'moment'
import './index.less'
@inject('PublicStatus')
@observer
export class Product extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            page: 1,
            size: 10,
            brandList: [],
            CatTotalList: [],
            skuData: [],
            commentsData: [],
            productId: '',
            detail: "",
            imgList: ""

        }
        this.imgIp = config.config.imgIp
        this.columns = [
            {
                title: '主图',
                dataIndex: 'image',
                key: 'image',
                render: (text, record) => {

                    return (
                        <img style={{ width: 100, height: 100 }} src={this.imgIp + record.image.split(',')[0]} />
                    )
                }
            },
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },

            {
                title: '开始时间',
                dataIndex: 'startTime',
                key: 'startTime',
                record: (text, record) => {
                    return (
                        <span>{record.startTime}</span>
                    )
                }
            },
            {
                title: '结束时间',
                dataIndex: 'endTime',
                key: 'endTime',
                record: (text, record) => {
                    return (
                        <span>{record.startTime}</span>
                    )
                }
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => {
                    let title = ''
                    const num = record.status;
                    if (num === 2) {
                        title = '正常'
                    }
                    if (num === 3) {
                        title = '禁用'
                    }
                    if (num === 4) {
                        title = '草稿'
                    }
                    return (
                        <span>{title}</span>
                    )
                }
            },
            {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                render: (text, record) => {
                    const { status } = record
                    return <div style={{ cursor: "pointer" }} className='all-operate'>
                        <span onClick={() => {
                            this.setState({
                                visible: true,
                                type: '2'
                            })
                            this.getProductSkuListPage(record.id),
                                this.updateProduct(record)
                        }}>修改</span>
                        <Divider type="vertical" />
                        <span onClick={() => {
                            this.deleteProduct(record.id)
                        }}>删除</span>
                        {status === 2 ? <span><Divider type="vertical" />
                            <span span onClick={() => {
                                this.downProduct(record.id)
                            }}>下架</span></span> : null}
                        {status === 4 ? <span><Divider type="vertical" />
                            <span span onClick={() => {
                                this.upProduct(record.id)
                            }}>上架</span></span> : null}
                        <Divider type="vertical" />
                        <span span onClick={() => {
                            this.setState({
                                type: '3',
                                visible: true,
                                productId: record.id
                            })
                            this.getProductCommentListPage(record.id, 1, 10)
                        }}>评论列表</span>


                    </div>
                }
            },
        ];
        this.child = () => { };
    }
    componentDidMount() {
        this.getProductListPage()
    }
    //品牌列表
    getbrandList = () => {
        const { page, size } = this.state
        ajax({
            method: 'postJson',
            data: {

            },
            api: 'brandList'
        }).then(res => {
            if (res.code === 200) {
                this.setState({
                    brandList: res.data.list
                })
            }
            else {
                message.error(res.msg)
            }
        })
    }
    getCatTotalList = () => {
        const { page, size } = this.state
        ajax({
            method: 'postJson',
            data: {

            },
            api: 'catTotalList'
        }).then(res => {
            if (res.code === 200) {
                this.setState({
                    CatTotalList: res.data
                })
            }
            else {
                message.error(res.msg)
            }
        })
    }
    getProductListPage = () => {
        const { page, size } = this.state
        ajax({
            method: 'postJson',
            data: {
                page,
                size
            },
            api: 'productListPage'
        }).then(res => {
            if (res.code === 200) {
                this.setState({
                    dataSource: res.data.list
                })
            }
            else {
                message.error('获取商品列表失败')
            }
        })
    }
    //修改商品
    updateProduct = (record) => {
        const { form, PublicStatus } = this.props
        const { setRichText } = PublicStatus
        const { startTime, detailUrl, image, endTime, title, price, productCatId, productBannerId,
        } = record
        setRichText(detailUrl)
        this.setState({
            imgList: image.split(',')
        })
        form.setFieldsValue({
            startTime: moment(startTime),
            endTime: moment(endTime),
            title, price, productCatId, productBannerId,
        })
    }
    saveProduct = () => {
        const { form, PublicStatus } = this.props;
        const { skuData } = this.state;
        const { richText, productFile } = PublicStatus
        let image = ''
        if (productFile !== "") {
            image = productFile.map(item => item.path).join(',')
        }
        else {
            message.info('至少上传一张图片')
            return;
        }
        form.validateFields((err, values) => {
            if (!err) {
                values.startTime = values.startTime.format('YYYY-MM-DD HH:mm:ss')
                values.endTime = values.endTime.format('YYYY-MM-DD HH:mm:ss')
                values.detail = richText,
                    values.image = image
                values.productSkuList = skuData,
                    ajax({
                        method: 'postJson',
                        data: values,
                        api: 'saveProduct'
                    }).then(res => {
                        if (res.code === 200) {
                            this.setState({
                                visible: false
                            })
                            message.success(res.msg)
                        }
                        else {
                            message.error(res.msg)
                        }
                    })

            }
        });

    }
    //更新sku 

    updateSku = (data) => {
        this.setState({
            skuData: data
        })
    }

    // 获取sku的列表
    getProductSkuListPage = (productId) => {
        ajax({
            method: 'postJson',
            data: { productId },
            api: 'getProductSkuListPage'
        }).then(res => {
            if (res.code === 200) {
                this.child.editSkuData(res.data.productSkuList);
                message.success(res.msg)
            }
            else {
                message.error(res.msg)
            }
        })
    }
    //删除商品
    deleteProduct = (productId) => {
        ajax({
            method: 'postJson',
            data: { productId },
            api: 'deleteProduct'
        }).then(res => {
            if (res.code === 200) {
                this.getProductListPage()
                message.success(res.msg)
            }
            else {
                message.error(res.msg)
            }
        })
    }
    //上架商品
    upProduct = (productId) => {
        ajax({
            method: 'postJson',
            data: { productId },
            api: 'putAwayProduct'
        }).then(res => {
            if (res.code === 200) {
                this.getProductListPage()
                message.success(res.msg)
            }
            else {
                message.error(res.msg)
            }
        })
    }
    //下架商品
    downProduct = (productId) => {
        ajax({
            method: 'postJson',
            data: { productId },
            api: 'downProduct'
        }).then(res => {
            if (res.code === 200) {
                this.getProductListPage()
                message.success(res.msg)
            }
            else {
                message.error(res.msg)
            }
        })
    }
    //获取评论列表
    getProductCommentListPage = (productId, page, size) => {
        ajax({
            method: 'postJson',
            data: { productId, page, size },
            api: 'getProductCommentListPage'
        }).then(res => {
            if (res.code === 200) {
                this.setState({
                    commentsData: res.data.list
                })
                message.success(res.msg)
            }
            else {
                message.error(res.msg)
            }
        })
    }
    renderTitle = () => {
        const { type } = this.state
        if (type === '1') {
            return '新增商品'
        }
        if (type === '2') {
            return '修改商品'
        }
        if (type === '3') {
            return '评论列表'

        }
    }

    render() {
        const { dataSource, visible, detail, imgList, commentsData, type, brandList, CatTotalList, productId } = this.state;
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const brandListOption = brandList.map(item => {
            return (
                <Option value={item.id}>{item.title}</Option>
            )
        })
        const catTotalListOption = CatTotalList.map(item => {
            return (
                <Option value={item.id}>{item.catName}</Option>
            )
        })
        return (<div className='banner-list'>
            <Button style={{ marginBottom: 20 }} onClick={() => {
                this.setState({
                    visible: true,
                    type: '1'
                })
                this.getbrandList();
                this.getCatTotalList();
            }}>新增</Button>
            <Table rowKey="id" style={{ marginBottom: 20 }} pagination={false} dataSource={dataSource} columns={this.columns} />
            <Pagination defaultCurrent={6} total={500} />
            <Drawer
                className="product-drawer"
                title={this.renderTitle()}
                width={1200}
                onClose={() => {
                    this.setState({
                        visible: false
                    })
                }}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                {type === '3' ? <Comments data={commentsData} productId={productId} getProductCommentListPage={this.getProductCommentListPage} /> : <Form layout="vertical" hideRequiredMark>
                    <Row >
                        <Form.Item label="标题">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请输入商品标题' }],
                            })(
                                <Input
                                    style={{ width: '100%' }}
                                    placeholder="请输入商品标题"
                                />,
                            )}
                        </Form.Item>
                    </Row>
                    <Row >
                        <Form.Item label="商品价格">
                            {getFieldDecorator('price', {
                                rules: [{ required: true, message: '请输入商品价格' }],
                            })(<Input />)}
                        </Form.Item>
                    </Row>
                    <Row >
                        <Form.Item label="商品分类">
                            {getFieldDecorator('productCatId', {
                                rules: [{ required: true, message: 'Please select an owner' }],
                            })(
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {catTotalListOption}

                                </Select>
                            )}
                        </Form.Item>
                    </Row>
                    <Row >
                        <Form.Item label="商品品牌">
                            {getFieldDecorator('productBannerId', {
                                rules: [{ required: true, message: 'Please select an owner' }],
                            })(
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {brandListOption}
                                </Select>
                            )}
                        </Form.Item>
                    </Row>
                    <Row >
                        <Form.Item label="SKU">
                            <Row>
                                <Sku type={type} onRef={(e) => {
                                    this.child = e;
                                }} updateSku={this.updateSku} />
                            </Row>
                        </Form.Item>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <Form.Item label="上架开始时间">
                                {getFieldDecorator('startTime', {
                                    rules: [{ required: true, message: '请输入上架开始时间' }],
                                })(<DatePicker format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm"
                                    showTime />)}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="上架结束时间">
                                {getFieldDecorator('endTime', {
                                    rules: [{ required: true, message: '请输如上架结束时间' }],
                                })(<DatePicker format="YYYY-MM-DD HH:mm"
                                    showTime />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Form.Item label="主图">
                            {type === '2' ? <div className="zhutu-show">
                                <Row>
                                    {imgList.length > 0 ? imgList.map(item => {
                                        return (
                                            <Col span={6}>   <img style={{width:100,height:100}} src={this.imgIp + item} alt="" /></Col>
                                        )
                                    }) : null}


                                </Row>
                            </div> : null}

                            <ImgUpload uplaodType="productUpload" />

                        </Form.Item>
                    </Row>
                    <Row >
                        <Form.Item label="详情">
                            <RichText detail={detail} />
                        </Form.Item>
                    </Row>
                </Form>}
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={() => {
                        if (type === '3') {
                            this.setState({
                                visible: false
                            })
                        }
                        else {
                            this.saveProduct()

                        }
                    }} style={{ marginRight: 8 }}>
                        确定
            </Button>
                    <Button onClick={() => {
                        this.setState({
                            visible: false
                        })
                    }} type="primary">
                        取消
            </Button>
                </div>
            </Drawer>
        </div>)
    }
}
export default Form.create()(Product);
