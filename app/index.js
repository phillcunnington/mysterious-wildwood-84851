import React from "react";
import ReactDOM from "react-dom";
import { Jumbotron } from "react-bootstrap";
import { Router, Route, browserHistory } from "react-router";

class LandingPage extends React.Component {
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <Jumbotron>
          <h1>Welcome!</h1>
          <p>This is the accounting, budgeting app.</p>
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
  </Router>,
    document.getElementById("app")
);