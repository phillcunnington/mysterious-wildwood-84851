const authentication = require("./authentication");
const mongoose = require("mongoose");

module.exports = {
    "configure": function(app) {
        const Transactions = mongoose.model("Transactions", {
            date: Date,
            payee: String,
            amount: Number
        });
        app.all("/api*", authentication.enforceAuthenticationWith401);
        app.all("/api", authentication.enforceAuthenticationWith401);
        app.get("/api/transactions", function(req, res) {
            Transactions.find()
                .exec(function(err, transactions) {
                    res.json(transactions);
                })
        });
    }
};