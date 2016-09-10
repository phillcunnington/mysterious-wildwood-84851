const transaction = (state = {}, action) => {
    switch (action.type) {
        case "ADD_TRANSACTION":
            return {
                _id: action.transaction._id,
                date: action.transaction.date,
                payee: action.transaction.payee,
                amount: action.transaction.amount
            };
        default:
            return state
    }
};

const transactions = (state = [], action) => {
    switch (action.type) {
        case "ADD_TRANSACTION":
            return [
                ...state,
                transaction(undefined, action)
            ];
        case "SET_TRANSACTIONS":
            return action.transactions;
        default:
            return state
    }
};

export default transactions