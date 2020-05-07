import React from "react";
import classes from "./BuildControls.css";

import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map((ctr) => {
      return (
        <BuildControl
          key={ctr.label}
          label={ctr.label}
          added={() => props.addIngredients(ctr.type)}
          remove={() => props.removeIngredients(ctr.type)}
          disabled={props.disabled[ctr.type]}
        />
      );
    })}
  </div>
);

export default buildControls;
