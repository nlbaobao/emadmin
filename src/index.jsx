import React from "react";
import ReactDom from "react-dom";
import { ConfigProvider } from "antd";
import { Provider } from "mobx-react";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Login from './pages/login/login'
import store from "./models/index";
import App from "./app";

import "@babel/polyfill";

ReactDom.render(
  <ConfigProvider locale={zhCN}>
    <Provider {...store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);
