import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import UserPage from "./UserPage";
import SignUp from "./SignUp";
import React from "react";

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/signup">Need to Sign Up?</Link>
        </nav>
        <main>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/welcomeback" component={UserPage} />
            <Route exact path="/signup" component={SignUp} />
          </div>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
