import React, { Component } from "react";
import { message, Button, Table, Divider, Drawer, Form, Col, Row, Input, Select, Pagination } from 'antd';
import { ajax } from "../../utils/index";
import './index.less'

export class Product extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [{ bannerContent: '1', bannerHref: '11111', status: '0' }, { bannerContent: '1', bannerHref: '11111', status: '0' }],
            visible: false,
            type: '1', // 1代表新增
        }
        this.columns = [
            {
                title: '内容',
                dataIndex: 'bannerContent',
                key: 'bannerContent',
            },
            {
                title: '链接',
                dataIndex: 'bannerHref',
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
                        <span>删除</span>
                    </div>
                }
            },
        ];
    }
    componentDidMount() {

    }
    login = () => {
        ajax({
            method: 'post',
            data: {
                username: userName,
                password: password
            },
            api: 'login'
        }).then(res => {
            console.log(res)
            if (res.code === 200) {

            }
            else {
                message.error('登录失败')
            }
        })
    }
    //creat或者update
    handleMessage = () => {
        const { form } = props;
        const { } = form;
        const rules = ['industrySummary'];
        form.validateFields(rules, (err, values) => {
            if (!err) {
                ajax({

                }).then(() => {

                })
            }
        });
    }
    //获取详细信息



    render() {
        const { dataSource, visible, type } = this.state;
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (<div className='banner-list'>
            {dataSource.length === 0 ? <Button onClick={() => {
                this.setState({
                    visible: true
                })
            }}>新增</Button> : null}
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
                            <Form.Item label="内容">
                                {getFieldDecorator('banner', {
                                    rules: [{ required: true, message: 'Please enter user name' }],
                                })(<Input placeholder="Please enter user name" />)}
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
                                    rules: [{ required: true, message: 'Please select an owner' }],
                                })(
                                    <Select placeholder="Please select an owner">
                                        <Option value="xiao">Xiaoxiao Fu</Option>
                                        <Option value="mao">Maomao Zhou</Option>
                                    </Select>,
                                )}
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
                    <Button style={{ marginRight: 8 }}>
                        确定
            </Button>
                    <Button type="primary">
                        取消
            </Button>
                </div>
            </Drawer>
        </div>)
    }
}
export default Form.create()(Product);
