import React from "react";
import ReactDom from "react-dom";
import { LocaleProvider } from "antd";
import { Provider } from "mobx-react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Login from './pages/login/login'
import App from "./app";

ReactDom.render(
  <LocaleProvider>
    <Provider>
      <App />
    </Provider>
  </LocaleProvider>,
  document.getElementById("root")
);
