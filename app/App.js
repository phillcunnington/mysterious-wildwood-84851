import React from "react";
import { Button } from "react-bootstrap";

export default React.createClass({
  render() {
    return (
      <div>
        This is the protected app!
        <span><Button bsStyle="link" href="auth/logout">Logout</Button></span>
      </div>
    );
  }
})