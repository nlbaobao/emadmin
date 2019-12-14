import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from "./components/loayout";
import Login from "./pages/login/login";
import Index from "./pages/index/index";
import List from "./pages/list/list";
import Details from "./pages/details/details";
import TestTable from "./pages/list/test-table";

export default class APP extends React.Component {
  render() {
    const IndexRoute = () => (
      <Layout>
        <Route exact path="/home" component={Index} />
        <Route exact path="/home/list" component={List} />
        <Route exact path="/home/list/details" component={Details} />
      </Layout>
    );
    return (
      <Router>
        <Route exact path="/test" component={TestTable} />
        <Route exact path="/" component={Login} />
        <Route path="/home" component={IndexRoute} />
      </Router>
    );
  }
}
