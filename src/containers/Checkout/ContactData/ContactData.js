import React, { Component } from "react";
import classes from "./ContactData.css";

import Button from "../../../components/UI/Button/Button";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postCode: "",
    },
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your data here!</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Enter your name"
          />
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <input
            className={classes.Input}
            type="text"
            name="steet"
            placeholder="Enter your street address"
          />
          <input
            className={classes.Input}
            type="text"
            name="postcode"
            placeholder="Enter your post code address"
          />
        </form>
        <Button btnType="Success">Order Now</Button>
      </div>
    );
  }
}

export default ContactData;
