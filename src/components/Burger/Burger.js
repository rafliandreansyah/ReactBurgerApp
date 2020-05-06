import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  const transformIngredients = Object.keys(props.ingredient).map((igKeys) => {
    return [...Array(props.ingredient[igKeys])].map((_, i) => {
      return <BurgerIngredient key={igKeys + i} type={igKeys} />;
    });
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
