import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/logout/Logout";
import * as actionTypes from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }

  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actionTypes.checkAuthState()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
