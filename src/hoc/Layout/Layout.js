import React, { Component } from "react";

import classes from "./Layout.css";
import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import { connect } from "react-redux";

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
        <Toolbar
          isAuth={this.props.isAutheticated}
          toggleClicked={this.toggleSideDrawerHandler}
        />
        <SideDrawer
          isAuth={this.props.isAutheticated}
          open={this.state.showSideDrawer}
          closed={this.showSideDrawerHandler}
        />
        <main className={classes.Container}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAutheticated: state.auth.token != null,
  };
};

export default connect(mapStateToProps)(Layout);
