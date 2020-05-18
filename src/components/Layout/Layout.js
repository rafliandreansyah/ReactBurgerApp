import React, { Component } from "react";

import classes from "./Layout.css";
import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  showSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleSideDrawerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar toggleClicked={this.toggleSideDrawerHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.showSideDrawerHandler}
        />
        <main className={classes.Container}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
