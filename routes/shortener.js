const router = require("express").Router();
const shortid = require("shortid");
const client = require('../redis_client');


router.post('/', async(req, res) => {
    try{
        const {url, expireAt} = req.body;

        // validation

        // generate short url
        const shortURL = shortid.generate();
        
        
        await client.hSet(shortURL, [
            'id', shortURL,
            'url', url,
            'expireAt', expireAt,
        ]);
    
        // const value = await client.hGetAll(shortURL);
        // res.status(200).json(value);
        res.status(200).json({"id" : shortURL, "shortUrl" : "http://localhost:8000/" + shortURL});
        console.log("post")
        
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;