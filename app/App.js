import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { loadTransactions, getBalance } from "./actions";
import TransactionListView from "./TransactionListView";
import AddTransactionModal from "./AddTransactionModal";
import CurrentBalance from "./CurrentBalance";

const App = React.createClass({
  componentDidMount: function() {
      const { dispatch } = this.props;
      dispatch(loadTransactions());
      dispatch(getBalance());
  },

  render() {
    return (
      <div className="app">
          <span style={{color: "white"}}>*</span>
        <span className="app__logout-button"><Button bsStyle="link" href="auth/logout">Logout</Button></span>
          <div style={{marginTop: "20px"}}>
              <CurrentBalance currentBalance={this.props.currentBalance} />
          </div>
        <AddTransactionModal />
        <TransactionListView transactions={this.props.transactions} />
      </div>
    );
  }
});

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions,
        currentBalance: state.currentBalance
    }
};

export default connect(mapStateToProps)(App);