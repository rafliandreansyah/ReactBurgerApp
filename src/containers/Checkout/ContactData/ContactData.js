import React, { Component } from "react";
import classes from "./ContactData.css";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const data = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      constumers: {
        address: {
          country: "Indonesia",
          street: "Perumahan. Araya",
          zipCodes: "21231",
        },
        email: "test@gmail.com",
        name: "Rafli andreansyah",
      },
      deliveryMethod: "Fasters",
    };
    axios
      .post("/orders.json", data)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
        alert("Error Purchase");
      });
    // console.log(this.props.ingredients);
    // console.log(this.props.price);
  };

  render() {
    let form = (
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
    );

    if (this.state.loading === true) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your data here!</h4>
        {form}
        <Button btnType="Success" clicked={this.orderHandler}>
          Order Now
        </Button>
      </div>
    );
  }
}

export default ContactData;
