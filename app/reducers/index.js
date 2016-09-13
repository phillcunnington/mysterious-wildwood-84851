import { combineReducers } from "redux";
import transactions from "./transactions";
import _ from "lodash";
import moment from "moment";

const currentBalance = (state = 0, action) => {
    switch (action.type) {
        case "SET_BALANCE":
            return action.currentBalance;
        default:
            return state
    }
};

const COMPARISON_MONTH = moment().month();
const monthlySpend = (state = 0, action) => {
    switch (action.type) {
        case "INIT_MONTHLY_SPEND":
            return _
                .chain(action.transactions)
                .filter((transaction) => {
                    return moment(transaction.date).month() == COMPARISON_MONTH;
                })
                .map((transaction) => {
                    return transaction.amount;
                })
                .reduce((sum, n) => {
                    return sum + n
                })
                .value() || state;
        case "UPDATE_MONTHLY_SPEND":
            return _
                .chain([action.transaction])
                .filter((transaction) => {
                    return moment(transaction.date).month() == COMPARISON_MONTH;
                })
                .map((transaction) => {
                    return transaction.amount;
                })
                .reduce((sum, n) => {
                    return sum + n
                })
                .value() + state;
        default:
            return state;
    }
};

const appReducers = combineReducers({
    transactions,
    currentBalance,
    monthlySpend
});

export default appReducers;