const authentication = require("./authentication");
const mongoose = require("mongoose");

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
                        console.log("Failed to load transactions");
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
                    console.log("Failed to save transaction: " + req.body);
                    res.statusCode = 500;
                } else {
                    res.json(transaction);
                }
            })
        });
    }
};