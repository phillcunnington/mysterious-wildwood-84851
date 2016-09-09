import React from "react";
import { Jumbotron, Button } from "react-bootstrap";

const LandingPage = () => (
  <div style={{textAlign: "center"}}>
    <Jumbotron>
      <h1>Welcome!</h1>
      <p>This is the accounting, budgeting app.</p>
      <p><Button bsStyle="primary" href="auth/google">Login</Button></p>
    </Jumbotron>
  </div>
);

export default LandingPage