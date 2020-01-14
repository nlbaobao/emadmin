import React from "react";
import { Modal, message } from "antd";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { ajax } from "../utils/index";
import { observer, inject } from "mobx-react";
import config from "./config";
@inject("PublicStatus")
@observer
class RichText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRichText: false,
      editorContent: ""
    };
  }
  componentWillReceiveProps(props) {}
  componentDidMount() {}
  handleClearContent = () => {
    const { updateDtailUrl } = this.props;
    updateDtailUrl("");
  };

  onEditorChange = editorContent => {
    const { updateEditorContent } = this.props;
    updateEditorContent(draftToHtml(editorContent));
  };

  onEditorStateChange = editorState => {
    const { updateDtailUrl } = this.props;
    updateDtailUrl(editorState);
  };

  imageUploadCallBack = file =>
    new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let img = new Image();
      // let url = ''
      reader.onload = function(e) {
        img.src = this.result;
      };
      img.onload = () => {
        //console.log(img); // 获取图片
        // console.log(img.src.length)
        // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");

        // 图片原始尺寸
        let originWidth = this.width;
        let originHeight = this.height;

        // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
        let maxWidth = 400,
          maxHeight = 500;
        // 目标尺寸
        let targetWidth = originWidth,
          targetHeight = originHeight;
        // 图片尺寸超过300x300的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        let newUrl = null;
        /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/
        const formData = new FormData();
        formData.append("file", file);
        ajax({
          api: "fileUpload",
          method: "fileUpload",
          processData: false,
          data: formData
        }).then(res => {
          if (res.code == 200) {
            const { path } = res.data[0];
            const { imgIp } = config.config;
            const link = imgIp + path;
            resolve({
              data: {
                link
              }
            });
          } else {
            message.error(res.msg);
          }
        });
      };
    });

  render() {
    const { detail } = this.props;
    console.log(detail, "detail");
    return (
      <div>
        <Editor
          editorState={detail}
          onContentStateChange={this.onEditorChange}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              uploadCallback: this.imageUploadCallBack,
              previewImage: true,
              inputAccept: "image/gif,image/jpeg,img/jpg,image/png,img/svg",
              alt: { persent: false, mandatory: false }
            }
          }}
        />

        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false
            });
          }}
          footer={null}
        ></Modal>
      </div>
    );
  }
}
export default RichText;
