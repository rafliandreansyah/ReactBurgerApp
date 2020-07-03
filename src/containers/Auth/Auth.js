import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as action from "../../store/actions/index";

class Auth extends Component {
  state = {
    control: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email...",
        },
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        value: "",
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        value: "",
        touched: false,
      },
    },
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  changeInputHandler = (event, inputHandler) => {
    const updateForm = {
      ...this.state.control,
      [inputHandler]: {
        ...this.state.control[inputHandler],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.control[inputHandler].validation
        ),
        touched: true,
      },
    };
    this.setState({ control: updateForm });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.control.email.value,
      this.state.control.password.value
    );
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.control) {
      formElementArray.push({
        id: key,
        config: this.state.control[key],
      });
    }
    const form = formElementArray.map((formElement) => (
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
    ));
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(action.auth(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
