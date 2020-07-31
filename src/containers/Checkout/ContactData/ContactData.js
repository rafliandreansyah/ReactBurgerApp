import React, { Component } from "react";
import classes from "./ContactData.css";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/errorHandling/errorHandling";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 50,
        },
        valid: false,
        value: "",
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        value: "",
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        value: "",
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        validation: {
          required: true,
        },
        valid: false,
        value: "",
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        validation: {
          required: true,
        },
        valid: false,
        value: "",
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          option: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {}, //fix error dropdown rule1
        valid: true,
      },
    },
    isValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const form = {};
    for (let formElementIdentifier in this.state.orderForm) {
      form[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const data = {
      ingredients: this.props.ingr,
      price: this.props.price,
      constumers: form,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(data, this.props.token);

    // console.log(this.props.ingredients);
    // console.log(this.props.price);
  };

  validationHandler(value, rules) {
    let isValid = true;

    // if (!rules) { //Fix error drowdown rule 2
    //   return true
    // }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
      console.log(`isValid required ${isValid}`);
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
      console.log(`isValid minLength ${isValid}`);
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
      console.log(`isValid maxLength ${isValid}`);
    }

    return isValid;
  }

  errorMessageHandler() {}

  changeInputHandler = (event, inputIdentifier) => {
    const updateForm = { ...this.state.orderForm };
    const updateFormElement = { ...updateForm[inputIdentifier] };

    updateFormElement.value = event.target.value;
    updateFormElement.valid = this.validationHandler(
      updateFormElement.value,
      updateFormElement.validation
    );
    updateFormElement.touched = true;
    updateForm[inputIdentifier] = updateFormElement;
    console.log(updateFormElement);

    let formIsValid = true;
    for (let inputIdentifier in updateForm) {
      formIsValid = updateForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updateForm, isValid: formIsValid });
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
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            minLengthMessage={formElement.config.validation.minLength}
            maxLengthMessage={formElement.config.validation.maxLength}
            changed={(event) => this.changeInputHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.isValid}>
          Order Now
        </Button>
      </form>
    );

    if (this.props.loading === true) {
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

const mapStateToProps = (state) => {
  return {
    ingr: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.puchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
