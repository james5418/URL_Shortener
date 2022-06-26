const router = require("express").Router();
const client = require("../utils/redis_client");
const PORT = process.env.PORT || 8000;

if(process.env.NODE_ENV === 'production') {
	HOST = 'https://short--url.herokuapp.com'
}
else{
	HOST = 'http://localhost'
}

router.get('/', async(req, res) => {
    try{
        const keys = await client.sendCommand(["keys","*"]);
        const query = [];

        for(let i=0;i<keys.length;i++){
            const long_url = await client.hGetAll(keys[i]);
            query.push({"short_url":`${HOST}:${PORT}/${keys[i]}`, "original_url":`${long_url.url}`});
        }

        res.status(200).json(query);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;