import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logOut, getMe } from "../reducer";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMe();
  }

  render() {
    console.log(this.props);
    let user = this.props.user || {};
    let handleClick = this.props.handleClick || {
      function() {
        console.log("click");
      },
    };
    return (
      <div>
        <h1>Welcome back {user.email}!</h1>
        <div>
          <button onClick={handleClick}>Logout</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick(evt) {
      evt.preventDefault();
      dispatch(logOut()).then(() => {
        ownProps.history.push("/");
      });
    },
    getMe: () => dispatch(getMe()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
