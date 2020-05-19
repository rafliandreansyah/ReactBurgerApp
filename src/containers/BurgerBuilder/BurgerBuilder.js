import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandling from "../../hoc/errorHandling/errorHandling";

import axios from "../../axios-orders";

const INGREDIENT_PRICE = {
  salad: 0.2,
  bacon: 0.1,
  cheese: 0.3,
  meat: 0.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKeys) => {
        return ingredients[igKeys];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addedIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredient = {
      ...this.state.ingredients,
    };
    updateIngredient[type] = updateCount;
    const priceAdition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdition;
    this.setState({
      ingredients: updateIngredient,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(updateIngredient);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updateIngredient = {
      ...this.state.ingredients,
    };
    updateIngredient[type] = updateCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      ingredients: updateIngredient,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(updateIngredient);
  };

  purchasingHandler = () => this.setState({ purchasing: true });

  cancelPurchasing = () => this.setState({ purchasing: false });

  continuePurchasing = () => {
    // console.log('Continue purchasing!');
    this.setState({ loading: true });
    const data = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      constumers: {
        address: {
          country: "Indonesia",
          street: "Perumahan. Araya",
          zipCodes: "21231",
        },
        email: "test@gmail.com",
        name: "Rafli andreansyah",
      },
      deliveryMethod: "Fasters",
    };
    axios
      .post("/orders.json", data)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, purchasing: false });
        alert("Error Purchase");
      });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        cancelPurchasing={this.cancelPurchasing}
        continuePurchasing={this.continuePurchasing}
        price={this.state.totalPrice}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    //disableInfo{salad: true, bacon: false}
    return (
      <Aux>
        <Modal show={this.state.purchasing} clicked={this.cancelPurchasing}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredients={this.addedIngredientHandler}
          removeIngredients={this.removeIngredientHandler}
          disabled={disableInfo}
          ordered={this.purchasingHandler}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default errorHandling(BurgerBuilder, axios);
