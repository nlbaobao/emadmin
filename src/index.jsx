import React from "react";
import ReactDom from "react-dom";
import { LocaleProvider } from "antd";
import { Provider } from "mobx-react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Login from './pages/login/login'
import store from './models/index'
import App from "./app";
import '@babel/polyfill'

ReactDom.render(
  <LocaleProvider>
    <Provider {...store}>
      <App />
    </Provider>
  </LocaleProvider>,
  document.getElementById("root")
);
