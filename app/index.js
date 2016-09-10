import styles from "./styles/main.css";

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import appReducers from "./reducers";

import App from "./App";
import LandingPage from "./LandingPage";
import FailedLoginPage from "./FailedLoginPage";

const loggerMiddleware = createLogger()
let store = createStore(
    appReducers,
    compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={LandingPage} />
        <Route path="/app" component={App} />
        <Route path="/loginFailed" component={FailedLoginPage} />
      </Router>
    </Provider>,
    document.getElementById("app")
);