export function addTransaction(transaction) {
    return (dispatch) => {
        fetch("/api/transactions", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transaction)
        }).then(response => {
            return response.json();
        }).then((json) => {
            dispatch(transactionAdded(json));
        }).catch(error => {
            console.error("Failed to add transaction: " + JSON.stringify(transaction));
        });
    }
}

const transactionAdded = (transaction) => {
    return {
        type: "ADD_TRANSACTION",
        transaction
    }
};

const setTransactions = (transactions) => {
    return {
        type: "SET_TRANSACTIONS",
        transactions
    }
};

export function loadTransactions() {
    return (dispatch) => {
        fetch("/api/transactions", {
            method: "GET",
            credentials: "same-origin"
        }).then(response => {
            return response.json();
        }).then((json) => {
            dispatch(setTransactions(json));
        }).catch(error => {
            console.error("Failed to get transactions");
        });
    }
};