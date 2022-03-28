
const router = require("express").Router();
const shortid = require("shortid");

router.post('/', async(req, res) => {
    try{
        const {urls, expireAt} = req.body;

        // validation

        // generate short url
        const shortURL = shortid.generate();
        const client = require('../redis_client');

        await client.hSet('id', [
            'shortid', shortURL,
            'url', urls,
            'exp', expireAt,
        ]);
    
        const value = await client.hGetAll('id');
        res.status(200).json(value);
        
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;