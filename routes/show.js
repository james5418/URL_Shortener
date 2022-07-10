const router = require("express").Router();
const client = require("../utils/redis_client");
const PORT = process.env.PORT || 8000;

router.get('/', async(req, res) => {
    try{
        const keys = await client.sendCommand(["keys","*"]);
        const query = [];

        for(let i=0;i<keys.length;i++){
            const long_url = await client.hGetAll(keys[i]);
            let address = "";

            if(process.env.NODE_ENV === 'production') {
                address = `https://short--url.herokuapp.com/${keys[i]}`;
            }
            else{
                address = `http://localhost:${PORT}/${keys[i]}`;
            }

            query.push({"short_url":address, "original_url":`${long_url.url}`, "expired_date":`${long_url.expireAt}`});
        }

        res.status(200).json(query);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;