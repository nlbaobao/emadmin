import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  HashRouter
} from "react-router-dom";
import Layout from "./components/loayout";
import Login from "./pages/login/login";
import Index from "./pages/index/index";
import Money from "./pages/user/money";
import Details from "./pages/details/details";
import TestTable from "./pages/list/test-table";
import Banner from "./pages/other/banner";
import Notice from "./pages/other/notice";
import Product from "./pages/product/index";
import ProductBrand from "./pages/product/productBrand";
import ProductCat from "./pages/product/productCat";
import ProductComments from "./pages/product/comment";
import UserMessage from "./pages/user/index";
import Coupon from "./pages/coupon/coupon";
import Activity from "./pages/activity/activity";
import TryMessage from "./pages/activity/trymessage";
import OrderManage from "./pages/order/order";
import DataEchart from "./pages/data/data";

export default class APP extends React.Component {
  render() {
    const IndexRoute = () => (
      <Layout>
        <HashRouter>
          <Switch>
            <Route
              exact
              path="/home"
              render={() => <Redirect to="/user/message" />}
            />
            <Route exact path="/home/user/message" component={UserMessage} />
            <Route exact path="/home/user/money" component={Money} />
            <Route exact path="/home/list/details" component={Details} />
            <Route exact path="/home/other/banner" component={Banner} />
            <Route exact path="/home/product/all" component={Product} />
            <Route exact path="/home/product/brand" component={ProductBrand} />
            <Route exact path="/home/product/cat" component={ProductCat} />
            <Route
              exact
              path="/home/product/comments"
              component={ProductComments}
            />
            <Route exact path="/home/coupon/manage" component={Coupon} />
            <Route exact path="/home/activity/assemble" component={Activity} />
            <Route
              exact
              path="/home/activity/trymessage"
              component={TryMessage}
            />
            <Route exact path="/home/other/notice" component={Notice} />
            <Route exact path="/home/order/manange" component={OrderManage} />
            <Route exact path="/home/data/manage" component={DataEchart} />
          </Switch>
        </HashRouter>
      </Layout>
    );
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/test" component={TestTable} />
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/home" component={IndexRoute} />
          <Route path="/login" component={Login} />
        </Switch>
      </HashRouter>
    );
  }
}
