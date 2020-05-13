import React from "react";

import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients).map((igKeys) => (
    <li key={igKeys}>
      {igKeys}: {props.ingredients[igKeys]}
    </li>
  ));
  return (
    <Aux>
      <h3>Your order</h3>
      <p>Your burger with the following ingredients:</p>
      <ul>{ingredients}</ul>
      <p>Continue for check out?</p>
      <Button btnType="Danger" clicked={props.cancelPurchasing}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.continuePurchasing}>
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;
