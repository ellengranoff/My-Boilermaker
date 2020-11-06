import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import Routes from "./components/Routes";

ReactDOM.render(
  <Provider store={store}>
    <div>Welcome To BoilerMaker!</div>
    <Routes />
  </Provider>,
  document.getElementById("app")
);
