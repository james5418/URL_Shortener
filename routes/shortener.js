const router = require("express").Router();
const shortid = require("shortid");
const validUrl = require('valid-url');
const client = require('../redis_client');


router.post('/', async(req, res) => {
    try{
        const {url, expireAt} = req.body;
        
        if(!validUrl.isUri(url)){
            res.status(500).send("The input URL is invalid!");
        }
        else if(!expireAt){
            res.status(500).send("Expired date cannot be empty!");
        }
        else{
            const shortURL = shortid.generate();
            
            await client.hSet(shortURL, [
                'id', shortURL,
                'url', url,
                'expireAt', expireAt,
            ]);
        
            res.status(200).json({"id" : shortURL, "shortUrl" : "http://localhost:8000/" + shortURL});
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;