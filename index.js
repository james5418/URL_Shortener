const express = require("express");
const helmet = require("helmet");

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const client = require("./utils/redis_client");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.xssFilter());
app.use(express.static('public'));

if(process.env.NODE_ENV !== 'test') {
    const morgan = require("morgan");
    app.use(morgan('combined')); 
}

const showRouter = require("./routes/show");
app.use("/show", showRouter);

const shortenerRouter = require("./routes/shortener");
app.use("/api/v1/urls", shortenerRouter);

const redirectRouter = require("./routes/redirect");
app.use("/", redirectRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}...`);
});

module.exports = {server:app, PORT:PORT};