import React from "react";
import classes from "./Order.css";

const order = (props) => {
  let ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  let ingredientsOutput = ingredients.map((ig) => (
    <span
      key={ig.name}
      style={{
        textTransform: "capitalize",
        margin: "0 5px",
        border: "1px solid #ccc",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      {ig.name} {ig.amount}
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>Rp. {Number.parseFloat(props.price).toFixed(2)} </strong>
      </p>
    </div>
  );
};
export default order;
