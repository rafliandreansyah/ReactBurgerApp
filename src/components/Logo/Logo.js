import React from "react";
import classes from "./Logo.css";

import logoImage from "../../assets/images/28.1 burger-logo.png";

const logo = () => (
  <div className={classes.Logo}>
    <img src={logoImage} alt="My Burger" />
  </div>
);

export default logo;
