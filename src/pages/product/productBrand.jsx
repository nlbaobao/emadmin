import React, { Component } from "react";
import { message, Button, Table, Divider, Drawer, Form, Col, Row, Input, Select, Pagination ,Img} from 'antd';
import { ajax } from "../../utils/index";
import {ImgUpload} from '../../components/imgUpload'
import './index.less'

export class ProductBrand extends Component {

    constructor(props) {
        super(props)
        this.state = {
           
            dataSource: [],
            visible: false,
            type:'1', // 1代表新增
        }
        this.columns = [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'icon',
                dataIndex: 'icon',
                key: 'icon',
                render:(record)=>{
                   return <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577428023099&di=d4967fbf704eda41a255e3ea7c0b49bb&imgtype=0&src=http%3A%2F%2F7776175.s21i-7.faiusr.com%2F2%2FABUIABACGAAgy_n_tgUo2ILWNjCgBziABA.jpg" alt="" style={{width:'5    0px',height:'50px',borderRadius:'50%'}}/>
                  
                }   
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render:(s)=>{
                    if(s == 2){
                        return "正常";
                    }else if(s == 3){
                        return "禁用";
                    }else{
                        return "草稿";
                    }
                }
            },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'operate',
                render: (record) => {
                    return <div>
                        <span onClick={() => {
                            this.showDetail(record)
                            this.setState({
                                visible: true,
                                type:'2'
                            })
                        }}>修改</span>
                        <Divider type="vertical" />
                        <span onClick={() => {
                            this.delete(record)
                          
                        }}>删除</span>
                        <Divider type="vertical" />
                        <span onClick={() => {
                            this.handlePut(record)

                        }}>上架</span>
                        <Divider type="vertical" />
                        <span onClick={() => {
                            this.handleDown(record)

                        }}>下架</span>
                    </div>
                }
            },
        ];
    }
    componentDidMount() {
        this.getList()
    }
    delete = (id)=>{
        ajax({
            method: 'postJson',
            data:{
                "id":id
            },
            api: 'deleteBrand'
        }).then(res => {
            if (res.code === 200) {
                this.getList()
                message.success('删除成功')

            }
            else {
                message.error('删除失败')
            }
        })
    }
    showDetail =(record)=>{
        ajax({
            method: 'postJson',
            data:{
                "id":record
            },
            api: 'brand'
        }).then(res => {
            if (res.code === 200) {
                this.props.form.setFieldsValue({
                    title:res.data.title,
                    icon:res.data.icon,
                    id:res.data.id
                         
               })
            }
            else {
                message.error('获取品牌失败')
            }
        })
      
    }
    getList = () => {
        var that = this;
        ajax({
            method: 'postJson',
            data:{
                status:that.state.searchStatus,
                title:that.state.searchText
            },
            api: 'brandList'
        }).then(res => {
            if (res.code === 200) {
                this.setState({
                    dataSource: res.data.list
                })
            }
            else {
                message.error('获取品牌列表失败')
            }
        })
    }
    save =(formData)=>{
        var that = this
        ajax({
            method: 'postJson',
            data:formData,
            api: 'saveBrand'
        }).then(res => {
            if (res.code === 200) {
                that.getList()
                message.success('保存成功.');
                this.props.form.setFieldsValue({
                    title:"",
                    icon:"",
                    id:""
                         
               })
               this.setState({
                visible: false
            })
            }
            else {
                message.error('保存失败')
            }
        })
    }

    handleSave = ()=>{
        const { form } = this.props;
        const { type } = this.state;
        form.validateFields((err, values) => {
            if (!err) {
                this.save(values)
            }
        });
    }
    handlePut = (id)=>{
        var that = this
        ajax({
            method: 'postJson',
            data:{
                id:id
            },
            api: 'putBrand'
        }).then(res => {
            if (res.code === 200) {
                that.getList()
            }
            else {
                message.error('获取品牌列表失败')
            }
        })
    }
    handleDown = (id)=>{
        var that = this
        ajax({
            method: 'postJson',
            data:{
                id:id
            },
            api: 'downBrand'
        }).then(res => {
            if (res.code === 200) {
                that.getList()
            }
            else {
                message.error('获取品牌列表失败')
            }
        })
    }
    render() {
        const { dataSource, visible,type,searchStatus,searchText } = this.state;
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (<div className='banner-list'>
           
             <div>
              <Row gutter={24}>
                    <Col span={4}>  <Form.Item label="内容">
                   
                        <Input value={searchText} onChange={(e) => {
                            
                            this.setState({
                                searchText: e.target.value
                            })
                        }} style={{ width: 200 }}></Input>
                       
                    </Form.Item></Col>
                    <Col span={4}>  <Form.Item label="状态">
                        <Select value={searchStatus} onChange={(e) => {
                            this.setState({
                                searchStatus: e
                            })
                        }} style={{ width: 200 }} allowClear>
                            <Option key='2'>正常</Option>
                            <Option key='3'>禁用</Option>
                            <Option key='4'>草稿</Option>
                        </Select>
                    </Form.Item></Col>
                    <Col span={4}>  <Form.Item label="搜索">
                        <Button onClick={() => {

                            this.getList(searchStatus, searchText)
                        }}>搜索</Button>&nbsp;&nbsp;&nbsp;
                         <Button onClick={() => {
                this.setState({
                    visible: true
                })
            }}>新增</Button>
                    </Form.Item>
                   </Col>

                </Row>
            </div>
            <Table style={{marginBottom:20}} pagination={false} dataSource={dataSource} columns={this.columns} />
            <Pagination defaultCurrent={6} total={500} />
            <Drawer
              title={type==='1'?'新增':'修改'}
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
                            <Form.Item label="品牌名">
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '品牌名必填' }],
                                })(
                                   
                                    <Input
                                        style={{ width: '100%' }}

                                        placeholder="请输入品牌名"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="品牌名">
                                {getFieldDecorator('id', {
                                    rules: [{ required: false }],
                                })(
                                   
                                   
                            <Input type="hidden"></Input>,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="品牌图片">
                                {getFieldDecorator('icon', {
                                    
                                    rules: [{ required: true, message: '请选择图片' }],
                                })(
                                    <Input
                                        style={{ width: '100%' }}

                                        placeholder="请输入图片链接" value="asdasds"
                                    />,
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
                    <Button onClick={this.handleSave} style={{ marginRight: 8 }} style={{ marginRight: 8 }}>
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
export default Form.create()(ProductBrand);
