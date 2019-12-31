import React, { Component } from "react";
import { message, Button, Table, Divider, Drawer, Form, Col, Icon, Row, Upload, Input, Select, Pagination } from 'antd';
import { ajax } from "../../utils/index";
import ImgUpload from '../../components/imgUpload'
import { observer, inject } from 'mobx-react'
import './index.less'
@inject('PublicStatus')
@observer
export class Banner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            visible: false,
            type: '1', // 1代表新增
            searchType: '',
            status: '',
            page: 1,
            size: 20
        }
        this.columns = [
            {
                title: '内容',
                dataIndex: 'bannerContent',
                key: 'bannerContent',
            },
            {
                title: '链接',
                key: 'bannerHref',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                render: () => {
                    return <div>
                        <span onClick={() => {
                            this.setState({
                                visible: true,
                                type: '1'
                            })
                        }}>新增</span>
                        <Divider type="vertical" />
                        <span onClick={() => {
                            this.setState({
                                visible: true,
                                type: '2'
                            })
                        }}>修改</span>
                        <Divider type="vertical" />
                        <span onClick={()=>{
                            this.deletBanner('1')
                        }}>删除</span>
                    </div>
                }
            },
        ];
    }
    componentDidMount() {
        this.getList()
    }
    getList = () => {
        const { type, status, page, size } = this.state;
        ajax({
            method: 'postJson',
            data: {
                type,
                status,
                page,
                size
            },
            api: 'bannerList'
        }).then(res => {
            console.log(res)
            if (res.code === 200) {
                this.setState({
                    dataSource: res.data.list
                })
            }
            else {
                message.error(res.message)
            }
        })
    }
    save = (values) => {
        ajax({
            method: 'postJson',
            data: {values},
            api: 'addBanner'
        }).then(res => {
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                this.getList()
                this.setState({
                    visible: false
                })
            }
            else {
                message.error(res.message)
            }
        })
    }
    deletBanner = (bannerId) => {
        ajax({
            method: 'post',
            data: bannerId,
            api: 'deleteBanner'
        }).then(res => {
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                this.getList()
            }
            else {
                message.error(res.message)
            }
        })
    }

    updateBnnaer = (values) => {
        ajax({
            method: 'post',
            data: values,
            api: 'updateBanner'
        }).then(res => {
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                this.getList()
                this.setState({
                    visible: false
                })
            }
            else {
                message.error(res.message)
            }
        })
    }

    //creat或者update
    handleMessage = () => {
        const { form,PublicStatus } = this.props;
        const { type } = this.state;
        const {file} = PublicStatus
        
        form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                if(type==='1'){
                this.save(values)
                }
                if(type==='2'){
                    this.updateBnnaer(values)
                }
               
            }
        });
    }
    //获取详细信息



    render() {
        const { dataSource, visible, type, searchType, status } = this.state;
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (<div className='banner-list'>
            {dataSource.length === 0 ? <Button style={{ marginBottom: 20 }} onClick={() => {
                this.setState({
                    visible: true
                })
            }}>新增</Button> : null}
            <div>
                {dataSource.length === 0 ? null : <Row gutter={24}>
                    <Col span={8}>  <Form.Item label="内容">

                        <Select value={searchType} onChange={(e) => {
                            this.setState({
                                searchType: e
                            })
                        }} style={{ width: 200 }}>
                            <Option key='1'>Banner</Option>
                            <Option key='2'>活动</Option>
                            <Option key='3'>公告</Option>
                        </Select>
                    </Form.Item></Col>
                    <Col span={8}>  <Form.Item label="状态">
                        <Select value={status} onChange={(e) => {
                            this.setState({
                                status: e
                            })
                        }} style={{ width: 200 }}>
                            <Option key='2'>正常</Option>
                            <Option key='3'>禁用</Option>
                            <Option key='4'>草稿</Option>
                        </Select>
                    </Form.Item></Col>
                    <Col span={8}>  <Form.Item label="搜索">
                        <Button onClick={() => {
                            this.getList(searchType, status)
                        }}>搜索</Button>
                    </Form.Item></Col>
                </Row>}
            </div>

            <Table style={{ marginBottom: 20 }} pagination={false} dataSource={dataSource} columns={this.columns} />
            <Pagination defaultCurrent={6} total={500} />
            <Drawer
                title={type === '1' ? '新增banner' : '修改banner'}
                width={720}
                onClose={() => {
                    this.setState({
                        visible: false
                    })
                }}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="banner内容">
                                {getFieldDecorator('banner', {
                                    rules: [{ required: true, message: '请填写banner内容' }],
                                })(<Input placeholder="请填写banner内容" />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="banner链接">
                                {getFieldDecorator('bannerHref', {
                                    rules: [{ required: true, message: '链接是必选项' }],
                                })(
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="请填写链接"
                                    />,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="bannerOrder">
                                {getFieldDecorator('bannerOrder', {
                                    rules: [{ required: true, message: 'banner顺序是必选项' }],
                                })(
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="banner顺序"
                                    />,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="跳转路径">
                                {getFieldDecorator('url', {
                                    rules: [{ required: true, message: '跳转路径是必选项' }],
                                })(
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="请填写跳转路径"
                                    />,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="banner类型">
                                {getFieldDecorator('type', {
                                    rules: [{ required: true, message: '类型势必选项' }],
                                })(
                                    <Select placeholder="请填写类型">
                                        <Option key='1'>Banner</Option>
                                        <Option key='2'>活动</Option>
                                        <Option key='3'>公告</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="banner状态">
                                {getFieldDecorator('status', {
                                    rules: [{ required: true, message: 'banner状态是必选项' }],
                                })(
                                    <Select placeholder="请填写banner状态">
                                        <Option key='2'>正常</Option>
                                        <Option key='3'>禁用</Option>
                                        <Option key='4'>草稿</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="上传banner">
                                <ImgUpload />
                                {/* <Upload>
                                    <Button>
                                        <Icon type="upload" />上传banner</Button>
                                </Upload> */}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
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
                    <Button onClick={this.handleMessage} style={{ marginRight: 8 }}>确定</Button>
                    <Button type="primary">
                        取消
            </Button>
                </div>
            </Drawer>
        </div>)
    }
}
export default Form.create()(Banner);
