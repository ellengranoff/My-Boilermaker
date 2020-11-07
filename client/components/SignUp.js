import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { signUp } from "../reducer";
import LoginForm from "./LoginForm";

const defaultState = {
  email: "",
  password: "",
};

class SignUp extends React.Component {
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
    this.props.signUp({ email, password });
    this.setState(defaultState);
  }
  render() {
    return (
      <div className="signup">
        <h2>Sign Up Here:</h2>
        <LoginForm
          state={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <form method="get" action="/auth/google">
          <button type="submit" className="btn bg-red white p1 rounded">
            Login with Google
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signUp: (data) =>
      dispatch(signUp(data)).then(() => {
        ownProps.history.push("/welcomeback");
      }),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
