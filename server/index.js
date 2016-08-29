const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const logger = require("morgan");

const fallback = require("express-history-api-fallback");
const root = `${__dirname}/../public`;

app.use(logger(process.env.HTTP_LOGGING_FORMAT));

app.use(express.static("public"));

app.use(fallback("index.html", { root }));

app.listen(port);
