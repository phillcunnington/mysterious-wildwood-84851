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

const appReducers = combineReducers({
    transactions,
    currentBalance
});

export default appReducers;