import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {
      bacon: 1,
      cheese: 1,
      meat: 1,
      salad: 1,
    },
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(`query ${query}`);
    const ingredient = {};
    for (let param of query.entries()) {
      // ['salad, '1']
      console.log(`param query entries: ${param}`);
      ingredient[param[0]] = +param[1];
    }
    console.log(`this is ingredients : ${ingredient}`);

    this.setState({ ingredients: ingredient });
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelCheckout={this.cancelCheckoutHandler}
          continueCheckout={this.continueCheckoutHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

export default Checkout;
