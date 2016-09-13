import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import TransactionListView from "./TransactionListView";
import AddTransactionModal from "./AddTransactionModal";
import { loadTransactions } from "./actions";

const App = React.createClass({
  componentDidMount: function() {
      const { dispatch } = this.props;
      dispatch(loadTransactions());
  },

  render() {
    return (
      <div className="app">
        <span className="app__logout-button"><Button bsStyle="link" href="auth/logout">Logout</Button></span>
        <AddTransactionModal />
        <TransactionListView transactions={this.props.transactions} />
      </div>
    );
  }
});

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions
    }
};

export default connect(mapStateToProps)(App);