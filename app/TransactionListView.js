import React, { PropTypes } from "react";
import { ListGroup } from "react-bootstrap";
import _ from "lodash";
import moment from "moment";
import numeral from "./configureNumeral";

const groupTransactionsByDate = (transactions) => {
  return _.reduce(transactions, (result, transaction) => {
    if (!result[transaction.date]) {
      result[transaction.date] = [];
    }
    result[transaction.date].push(_.omit(transaction, "date"));
    return result;
  }, {});
};

const generateListItems = (transactions) => {
  return _.reduce(groupTransactionsByDate(transactions), (result, transactionGroup, date) => {
    result.push(<TransactionListItemDateHeading key={date} date={date}/>);
    return result.concat(_.map(transactionGroup, (transaction) => {
      return <TransactionListItem key={transaction._id} transaction={transaction}/>
    }));
  }, []);
};

const TransactionListItemDateHeading = ({ date }) => (
    <li className="list-group-item disabled">
      {moment(date).format("dddd, D MMMM")}
    </li>
);
TransactionListItemDateHeading.propTypes = {
  date: PropTypes.string.isRequired
};

const TransactionListItem = ({ transaction }) => (
    <li className="list-group-item">
    <span>
      {transaction.payee}
    </span>
      <span className="transaction-list__list-item-amount">
      {numeral(transaction.amount / 100).format()}
    </span>
    </li>
);
TransactionListItem.propTypes = {
  transaction: PropTypes.shape({
    payee: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  }).isRequired
};

const TransactionList = ({ transactions }) => (
  <div className="transaction-list">
    <ListGroup componentClass="ul">
      {generateListItems(_.orderBy(transactions, ["date", "_id"], ["desc", "desc"]))}
    </ListGroup>
  </div>
);
TransactionList.propTypes = {
  transaction: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    payee: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  })
};

export default TransactionList