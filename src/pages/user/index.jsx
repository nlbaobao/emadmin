import React, { Component } from "react";
import { ajax } from "../../utils/http";
import { get, post } from "../../utils/fetch";

import { observer, inject } from 'mobx-react'

@inject('Test')
@observer
export default class list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: []
        };
    }
    componentDidMount() {
        // this.postlist();
        // this.get111();
        // this.testpost();
        // this.postlist()
    }


    postlist() {
        const data = {
            title: "foo",
            body: "bar",
            userId: 1
        };
        ajax({
            api: "/posts",
            method: "post",
            data,
            timeout: 15000
        })
            .then(res => {
                console.log(res, "post");
                return res;
            })
            .then(res => {
                console.log(res, "我要执行get");
                this.get();
            });
    }
    get111() {
        // ajax({
        //   api: "test",
        //   method: "get",
        //   timeout: 15000
        // }).then(res => {

        // });
        get('https://jsonplaceholder.typicode.com/todos/1').then((res) => console.log(res))
    }
    testpost = () => {
        let data = {
            title: 'foo',
            body: 'bar',
            userId: 1
        }
        post('https://jsonplaceholder.typicode.com/posts', data).then(res => console.log(res))
    }
    render() {
        console.log(this.props);
        return (
            <div className='user-manage'>
                用户管理
      </div>
        );
    }
}
