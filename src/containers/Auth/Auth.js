import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as action from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

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
    isSignUp: true,
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
      this.state.control.password.value,
      this.state.isSignUp
    );
  };

  switchSignUpHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.control) {
      formElementArray.push({
        id: key,
        config: this.state.control[key],
      });
    }
    let form = formElementArray.map((formElement) => (
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

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let redirect = null;
    if (this.props.isAuthenticated) {
      redirect = <Redirect to="/" />;
    }

    return (
      <div className={classes.Auth}>
        {redirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">
            {this.state.isSignUp ? "SIGN UP" : "SIGN IN"}
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchSignUpHandler}>
          SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(action.auth(email, password, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
