import React from "react";
import classes from "./Toolbar.css";

import Logo from "../../Logo/Logo";

const toolbar = () => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <Logo />
    <nav>Navigation</nav>
  </header>
);

export default toolbar;
