const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const logger = require("morgan");

const fallback = require("express-history-api-fallback");
const root = `${__dirname}/../public`;

app.use(logger(process.env.HTTP_LOGGING_FORMAT));

const authentication = require("./authentication");
authentication.init()(app);
app.get("/", authentication.forwardIfAuthenticated);
app.use(express.static("public"));
app.all("/app", authentication.enforceAuthenticationWithRedirect);


app.use(fallback("index.html", { root }));

app.listen(port);
