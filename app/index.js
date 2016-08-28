import React from "react";
import ReactDOM from "react-dom";
import {Jumbotron} from "react-bootstrap";

class App extends React.Component {
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

ReactDOM.render(
  <App />,
  document.getElementById("app")
);
