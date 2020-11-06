import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import UserPage from "./UserPage";
import React from "react";

const Routes = () => {
  return (
    <Router>
      <div>
        <main>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/welcomeback" component={UserPage} />
          </div>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
