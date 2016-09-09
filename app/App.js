import React from "react";
import { Button } from "react-bootstrap";
import TransactionListView from "./TransactionListView";
import _ from "lodash";

export default React.createClass({
  getInitialState: function() {
      return {
          transactions: []
      }
  },

  componentDidMount: function() {
    fetch("/api/transactions", {
      method: "GET",
      credentials: "same-origin"
    }).then(response => {
      return response.json();
    }).then((json) => {
      this.setState({
        transactions: _.orderBy(json, ["date"], ["desc"])
      });
    }).catch(error => {
      console.error("Failed to get transactions");
    });
  },

  render() {
    return (
      <div className="app">
        <span className="app__logout-button"><Button bsStyle="link" href="auth/logout">Logout</Button></span>
        <TransactionListView transactions={this.state.transactions} />
      </div>
    );
  }
})