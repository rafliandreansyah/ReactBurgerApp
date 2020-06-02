import React, { Component } from "react";
import classes from "./ContactData.css";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          option: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
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

  changeInputHandler = (event, inputIdentifier) => {
    const updateForm = { ...this.state.orderForm };
    const updateFormElement = { ...updateForm[inputIdentifier] };

    updateFormElement.value = event.target.value;
    updateForm[inputIdentifier] = updateFormElement;

    console.log(updateForm);
    console.log(updateFormElement);
    this.setState({ orderForm: updateForm });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.changeInputHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>
          Order Now
        </Button>
      </form>
    );

    if (this.state.loading === true) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your data here!</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
