const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const client = require('./redis_client');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8888;

const app = express();
app.use(express.json());
app.use(helmet())
app.use(helmet.xssFilter());
// app.use(morgan("common"));
app.use(express.static('public'));

const showRouter = require("./routes/show");
app.use("/show", showRouter);

const shortenerRouter = require("./routes/shortener");
app.use("/api/v1/urls", shortenerRouter);

const redirectRouter = require("./routes/redirect");
app.use("/", redirectRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}...`);
});

module.exports = app;