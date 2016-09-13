const authentication = require("./authentication");
const mongoose = require("mongoose");
const _ = require("lodash");

module.exports = {
    "configure": function(app) {
        const Transaction = mongoose.model("Transactions", {
            date: Date,
            payee: String,
            amount: Number
        });
        app.all("/api*", authentication.enforceAuthenticationWith401);
        app.all("/api", authentication.enforceAuthenticationWith401);
        app.get("/api/transactions", function(req, res) {
            Transaction.find()
                .exec(function(err, transactions) {
                    if (err) {
                        console.error("Failed to load transactions");
                        res.statusCode = 500;
                    } else {
                        res.json(transactions);
                    }
                })
        });
        app.post("/api/transactions", function(req, res) {
            const transaction = new Transaction(req.body);
            transaction.save(function(err, transaction) {
                if (err) {
                    console.error("Failed to save transaction: " + req.body);
                    res.statusCode = 500;
                } else {
                    Balance.findOne()
                        .exec(function(err, balance) {
                            if (err) {
                                //TODO revert transaction
                                console.error("Failed to load balance");
                                res.statusCode = 500;
                            } else {
                                balance.currentBalance += transaction.amount;
                                balance.save(function(err, balance) {
                                    if (err) {
                                        //TODO revert transaction
                                        console.error("Failed to update balance");
                                        res.statusCode = 500;
                                    } else {
                                        res.statusCode = 201;
                                        res.location(req.originalUrl + "/" + transaction._id);
                                        res.json(transaction);
                                    }
                                });
                            }
                        });
                }
            })
        });

        const Balance = mongoose.model("Balance", {
            currentBalance: Number,
            startingBalance: Number
        }, "balance");
        app.get("/api/balance", function(req, res) {
            Balance.findOne()
                .exec(function(err, balance) {
                    if (err) {
                        console.error("Failed to load balance");
                        res.statusCode = 500;
                    } else {
                        res.json(balance);
                    }
                })
        });
        app.post("/api/balance", function(req, res) {
            if (req.query["_action"] === "verify") {
                Transaction.find()
                    .exec(function(err, transactions) {
                        if (err) {
                            console.log("Failed to get transactions");
                            res.statusCode = 500;
                        } else {
                            const transactionsTotal = _.chain(transactions)
                                .map(function(transaction) {
                                    return transaction.amount;
                                })
                                .reduce(function(sum, n) {
                                    return sum + n;
                                })
                                .value();
                            Balance.findOne()
                                .exec(function(err, balance) {
                                    if (err) {
                                        console.log("Failed to get balance");
                                        res.statusCode = 500;
                                    } else {
                                        res.statusCode = 200;
                                        if (balance.currentBalance === (balance.startingBalance + transactionsTotal)) {
                                            res.json({valid: true});
                                        } else {
                                            res.json({
                                                valid: false,
                                                currentBalance: balance.currentBalance,
                                                startingBalance: balance.startingBalance,
                                                transactionsTotal: transactionsTotal,
                                                expectedCurrentBalance: balance.startingBalance + transactionsTotal
                                            });
                                        }
                                    }
                                })
                        }
                    });
            } else {
                res.statusCode = 501;
                res.json({});
            }
        });
    }
};