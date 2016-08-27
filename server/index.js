const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const logger = require("morgan");


app.use(logger(process.env.HTTP_LOGGING_FORMAT));



app.use(express.static("public"));


app.listen(port);
