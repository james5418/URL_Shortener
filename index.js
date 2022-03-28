const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

(async () => {

    const client = require('./redis_client');

    // await client.hSet('id', [
    //     'url', "xxx",
    //     'exp', "3/26",
    // ]);

    // const value = await client.hGetAll('id');
    // console.log(value.url)

    // await client.set('test', 'abc');
    // const value = await client.get('test');
    // console.log(value)

})();


app.use(express.json());

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


