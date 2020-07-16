import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandling from "../../hoc/errorHandling/errorHandling";
import { connect } from "react-redux";
import * as burgerBuilderAction from "../../store/actions/index";

import axios from "../../axios-orders";
// import axios from 'axios';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onSetIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKeys) => {
        return ingredients[igKeys];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  purchasingHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push("/auth");
    }
  };

  cancelPurchasing = () => this.setState({ purchasing: false });

  continuePurchasing = () => {
    // console.log('Continue purchasing!');

    console.log(this.props);
    this.props.onInitPurchased();
    this.props.history.push("/checkout");
    // const queryParams = [];
    // for (let i in this.props.ingr) {
    //   queryParams.push(
    //     encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ingr[i])
    //   );
    // }
    // console.log(queryParams);
    // queryParams.push("price=" + this.props.price);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString,
    // });
  };

  render() {
    const disableInfo = {
      ...this.props.ingr,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    //disableInfo{salad: true, bacon: false}

    let burger = this.props.error ? <p>Can't load data</p> : <Spinner />;
    if (this.props.ingr) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingr} />
          <BuildControls
            addIngredients={this.props.onIngredientsAdd}
            removeIngredients={this.props.onIngredientsRemove}
            disabled={disableInfo}
            ordered={this.purchasingHandler}
            purchasable={this.updatePurchaseState(this.props.ingr)}
            price={this.props.price}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingr}
          cancelPurchasing={this.cancelPurchasing}
          continuePurchasing={this.continuePurchasing}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} clicked={this.cancelPurchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingr: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientsAdd: (ingName) =>
      dispatch(burgerBuilderAction.addIngredients(ingName)),
    onIngredientsRemove: (ingName) =>
      dispatch(burgerBuilderAction.removeIngredients(ingName)),
    onSetIngredients: () => dispatch(burgerBuilderAction.initIngredients()),
    onInitPurchased: () => dispatch(burgerBuilderAction.initPurchased()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandling(BurgerBuilder, axios));
