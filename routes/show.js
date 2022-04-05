const router = require("express").Router();
const client = require("../utils/redis_client");

router.get('/', async(req, res) => {
    try{
        const keys = await client.sendCommand(["keys","*"]);
        const query = [];

        for(let i=0;i<keys.length;i++){
            const long_url = await client.hGetAll(keys[i]);
            query.push({"short_url":`http://localhost:8000/${keys[i]}`, "original_url":`${long_url.url}`});
        }

        res.status(200).json(query);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;