import React, { Component } from "react";
import { message, Button,Tabs, Divider, Form, Col, Row, Input, Select } from 'antd';
import { ajax } from "../../utils/index";
import {RichText} from "../../components/richText"
import './index.less'
import ImgUpload from "../../components/imgUpload";

export class Product extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
    }
    render() {
        const { form } = this.props;
        const { TabPane } = Tabs;
        function callback(key) {
            console.log(key);
        }
        const { getFieldDecorator } = form;
        return (<div className='banner-list'>

            <div>
               
            </div>



        </div>)
    }
}
export default Form.create()(Product);
