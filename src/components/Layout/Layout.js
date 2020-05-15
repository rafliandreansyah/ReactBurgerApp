import React from "react";

import classes from "./Layout.css";
import Aux from "../../hoc/Aux";

import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = (props) => (
  <Aux>
    <Toolbar />
    <main className={classes.Container}>{props.children}</main>
  </Aux>
);

export default layout;
