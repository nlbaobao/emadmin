import React, { Component } from "react";
// import $ from 'jquery'
import { ajax } from "../../utils/http";
export default class index extends Component {
  componentDidMount() {
    this.postlist();
    // console.log($);
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
        // console.log(res, "我要执行get");
        // this.get();
      });
  }
  render() {
    return <div>index!!!!!!!!!</div>;
  }
}
