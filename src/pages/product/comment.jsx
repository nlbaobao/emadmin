import React, { Component } from "react";
import { message, Table, Divider,Pagination } from 'antd';
import { ajax } from "../../utils/index";
import config from '../../components/config'
import './index.less'
export class Comments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
        }
        this.columns = [
            {
                title: '评论',
                dataIndex: 'content',
                key: 'content',
            },
            {
                title: '图片',
                dataIndex: 'image',
                key: 'image',
                render:()=>{
                    return(
                        <span>假装有图片</span>
                    )
                }
            },
            {
                title: '用户名',
                dataIndex: 'createUseName',
                key: 'createUseName',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
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
                render: (text, record) => {
                    const {status} = record;
                    return <div style={{ cursor: "pointer" }} className='all-operate'>
                          {status === 2 ? <span><Divider type="vertical" />
                            <span span onClick={() => {
                                this.disableComment(record.id)
                            }}>禁用评论</span></span> : null}
                        {status === 4 ? <span><Divider type="vertical" />
                            <span span onClick={() => {
                                this.putAwayComment(record.id)
                            }}>上架评论</span></span> : null}

                    </div>
                }
            },
        ];
    }
    putAwayComment = (productCommentId) => {
        const {getProductCommentListPage,productId} = this.props;
        ajax({
            method: 'postJson',
            data: { productCommentId },
            api: 'putAwayProduct'
        }).then(res => {
            if (res.code === 200) {
                message.success(res.msg)
                getProductCommentListPage(productId,1,10)
            }
            else {
                message.error(res.msg)
            }
        })
    }
    disableComment = (productCommentId) => {
        ajax({
            method: 'postJson',
            data: { productCommentId },
            api: 'disableComment'
        }).then(res => {
            if (res.code === 200) {
                message.success(res.msg)
            }
            else {
                message.error(res.msg)
            }
        })
    }
    render() {
        const { data } = this.props;       
        return (<div className='banner-list'>
            <Table rowKey="id" style={{ marginBottom: 20 }} pagination={false} dataSource={data} columns={this.columns} />
            <Pagination defaultCurrent={6} total={500} />
        </div>)
    }
}
export default Comments;
