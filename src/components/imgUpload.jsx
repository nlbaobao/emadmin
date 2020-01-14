import React from "react";
import { Upload, Button, Icon, message, Input } from "antd";
import "antd/dist/antd.css";
import { ajax } from "../utils/index";
import { observer, inject } from "mobx-react";

@inject("PublicStatus")
@observer
class ImgUpload extends React.Component {
  state = {
    fileList: [],
    uploading: false
  };

  componentDidMount() {}
  componentWillReceiveProps(props) {
    // const { PublicStatus } = props;
    // const { productFile } = PublicStatus;
    // console.log(productFile, "productFile");
    // this.setState({
    //   fileList:
    //     productFile &&
    //     productFile.map((item, uid) => {
    //       return {
    //         uid,
    //         name: item,
    //         status: "done",
    //         url: item
    //       };
    //     })
    // });
  }

  backTotable = url => {
    const { record, updateImg, dataSource } = this.props;
    const newData = dataSource.concat([]);
    newData.forEach(item => {
      if (item.key === record.key) {
        item.imageUrl = url;
      }
    });
    updateImg(newData);
  };
  returnPath = url=>{
    let { updateImg,icon} = this.props;
    console.log(url,"url")
    updateImg(url);
  }


  handleUpload = () => {
    const formData = new FormData();
    const { fileList } = this.state;

    console.log(fileList, "fileList");
    fileList.forEach(item => {
      formData.append("file", item);
    });
    const { PublicStatus, uplaodType } = this.props;
    let { setFile,returnPath, setProdutFile } = PublicStatus;
    this.setState({
      uploading: true
    });
    // You can use any AJAX library you like
    ajax({
      api: "fileUpload",
      method: "fileUpload",
      processData: false,
      data: formData
    }).then(res => {
      if (res.code == 200) {
        let url ="";
        const arr = res.data.map((item, index) => {
          url = item.path;
          return {
            uid: "-1",
            name: item.name,
            status: "done",
            url: item.path
          };
        });
        console.log(arr, "arr");

        this.state.fileList.concat(arr);
        this.setState({
          fileList: [],
          uploading: false
        });
        if (uplaodType === "productUpload") {
          console.log(fileList, "fileList");
          setProdutFile(fileList);
        }
        if (uplaodType === "returnPath") {
          console.log( res.data[0].path, "return path");
          this.returnPath(res && res.data[0].path);
          setFile(res.data.path);
        }

        if (uplaodType === "sku") {
          //把图片回显到表格
          console.log(res && res.data[0]);
          this.backTotable(res && res.data[0].path);
        } else {
          setFile(res.data.path);
        }
        message.success(res.msg);
      } else {
        this.setState({
          uploading: false
        });
        message.error(res.msg);
      }
    });
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          const { PublicStatus } = this.props;
          const { setProdutFile } = PublicStatus;
          setProdutFile(newFileList);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> 上传图片
          </Button>
        </Upload>
        <Input type="hidden" name="image"></Input>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          上传
        </Button>
      </div>
    );
  }
}
export default ImgUpload;
