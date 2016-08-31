import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";
import App from "./App";
import LandingPage from "./LandingPage";
import FailedLoginPage from "./FailedLoginPage";

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LandingPage} />
    <Route path="/app" component={App} />
    <Route path="/loginFailed" component={FailedLoginPage} />
  </Router>,
    document.getElementById("app")
);