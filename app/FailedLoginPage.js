import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const FailedLoginPage = () => (
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

export default FailedLoginPage