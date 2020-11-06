import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { logIn } from "../reducer";
import LoginForm from "./LoginForm";

const defaultState = {
  email: "",
  password: "",
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState(defaultState);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    this.props.logIn({ email, password });
    this.setState(defaultState);
  }

  render() {
    return (
      <div>
        <h3>Log In Here:</h3>
        <div>
          <LoginForm
            state={this.state}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logIn: (data) =>
      dispatch(logIn(data)).then(() => {
        ownProps.history.push("/welcomeback");
      }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
