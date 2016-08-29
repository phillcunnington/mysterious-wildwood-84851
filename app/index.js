import React from "react";
import ReactDOM from "react-dom";
import { Jumbotron, Button } from "react-bootstrap";
import { Router, Route, browserHistory } from "react-router";
import { LinkContainer } from "react-router-bootstrap";

class LandingPage extends React.Component {
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <Jumbotron>
          <h1>Welcome!</h1>
          <p>This is the accounting, budgeting app.</p>
          <p><Button bsStyle="primary" href="auth/google">Login</Button></p>
        </Jumbotron>
      </div>
    );
  }
}

class FailedLoginPage extends React.Component {
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <Jumbotron>
          <p>Login Failed!</p>
          <p>
            <LinkContainer to="/">
              <Button bsStyle="primary" href="/">Back</Button>
            </LinkContainer>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
          This is the protected app!
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LandingPage} />
    <Route path="/app" component={App} />
    <Route path="/loginFailed" component={FailedLoginPage} />
  </Router>,
    document.getElementById("app")
);