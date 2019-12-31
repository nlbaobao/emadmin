import React from 'react';
import {
    Upload, Button, Icon, message,Input
} from 'antd';
import 'antd/dist/antd.css';
import {ajax } from "../utils/index";
import { observer, inject } from 'mobx-react'

@inject('PublicStatus')
@observer
class ImgUpload extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    }

    componentDidMount(){
    
    }
    // componentWillReceiveProps(props){
    //     const {data} = props
    //     console.log(data,'data');
    //     if(data.length>0){
    //         const newData = data.map((item,index)=>{
    //             return{
    //                 url:item,
    //                 uid:index,
    //                 status: 'done',
    //                 name:item
    //             }
    //         })
    //         this.setState({
    //             fileList:newData
    //         })
    //     }
    // }

    backTotable=(url)=>{
        const {record,updateImg,dataSource}= this.props;
        const newData = dataSource.concat([])
        newData.forEach(item=>{
            if(item.key===record.key){
                item.imageUrl=url
            }
        })
        updateImg(newData)
    }

    handleUpload = () => {
        const formData = new FormData();
        const {fileList} = this.state;
        fileList.forEach(item=>{
        formData.append('file', item);

        })
        const {PublicStatus,uplaodType} = this.props;
        const {setFile,setProdutFile} = PublicStatus
        this.setState({
            uploading: true,
        });
        // You can use any AJAX library you like
        ajax({
            api: 'fileUpload',
            method: 'fileUpload',
            processData: false,
            data: formData,

        }).then(res=>{
            if (res.code == 200){
                this.setState({
                    fileList:[],
                    uploading: false,
                });
                if(uplaodType==='productUpload'){
                    setProdutFile(res.data)
                }
                if(uplaodType==='sku'){
                    //把图片回显到表格
                    console.log(res&&res.data[0])
                    this.backTotable(res&&res.data[0].path)
                }
                else{
                    setFile(res.data.path); 
                }
                message.success(res.msg);
            }else{
                this.setState({
                    uploading: false,
                });
                message.error(res.msg);
            }
        })
    }
    //更新列表
    updateFiledList =(data) => {
        this.setState({
            fileList:data
        })
    }

    render() {
        const { uploading, fileList } = this.state;
        console.log(fileList);
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <div>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> 上传图片
                    </Button>
                </Upload>
                <Input type="hidden" name="image" ></Input>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {/* {uploading ? '正在上传' : '上传结束' } */}
                    上传
                </Button>
            </div>
        );
    }
}
export default ImgUpload;