const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const client = require('./redis_client');


app.use(express.json());
app.use(express.static('public'));

const shortenerRouter = require("./routes/shortener");
app.use("/api/v1/urls", shortenerRouter);

const redirectRouter = require("./routes/redirect");
app.use("/", redirectRouter);

const showRouter = require("./routes/show");
app.use("/show", showRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}...`);
});
