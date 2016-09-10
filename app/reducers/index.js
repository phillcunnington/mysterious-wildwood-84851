import { combineReducers } from "redux";
import transactions from "./transactions";

const appReducers = combineReducers({
    transactions
});

export default appReducers;