import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, HashRouter } from "react-router-dom";
import Layout from "./components/loayout";
import Login from "./pages/login/login";
import Index from "./pages/index/index";
import List from "./pages/user/";
import Details from "./pages/details/details";
import TestTable from "./pages/list/test-table";
import Banner from './pages/other/banner'
import Product from './pages/product/index'

export default class APP extends React.Component {
  render() {
    const IndexRoute = () => (
      <Layout>
        <HashRouter>
          <Switch>
            <Route exact path="/home" render={() => <Redirect to='/user/message' />} />
            <Route exact path="/home/user/message" component={List} />
            <Route exact path="/home/user/message" component={List} />
            <Route exact path="/home/list/details" component={Details} />
            <Route exact path="/home/other/banner" component={Banner} />
            <Route exact path="/home/product/all" component={Product} />

          </Switch>
        </HashRouter>
      </Layout>
    );
    return (

      <HashRouter>
        <Switch>
          <Route exact path="/test" component={TestTable} />
          <Route exact path="/" render={() => <Redirect to='/login' />} />
          <Route path="/home" component={IndexRoute} />
          <Route path="/login" component={Login} />
        </Switch>
      </HashRouter>

    );
  }
}
