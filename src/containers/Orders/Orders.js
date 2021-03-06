import React, { Component } from "react";

import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import errorHandler from "../../hoc/errorHandling/errorHandling";
import * as action from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onStartFetchDataOrders(this.props.token, this.props.userId);
  }

  render() {
    let spinner = <Spinner />;
    if (!this.props.loading) {
      spinner = this.props.orders.map((data) => (
        <Order
          key={data.id}
          ingredients={data.ingredients}
          price={+data.price}
        />
      ));
    }
    return <div>{spinner}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onStartFetchDataOrders: (token, userId) =>
      dispatch(action.fetchOrder(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(Orders, axios));
