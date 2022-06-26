const router = require("express").Router();
const {nanoid} = require("nanoid");
const isUrl = require("is-valid-http-url");
const client = require("../utils/redis_client");
const check_date = require("../utils/validation");
const PORT = process.env.PORT || 8000;

router.post('/', async(req, res) => {
    try{
        const {url, expireAt} = req.body;

        if(!isUrl(url)){
            res.status(400).send("Invalid URL!");
        }
        else if(!check_date(expireAt)){
            res.status(400).send("Invaild expired date!");
        }
        else{
            const shortURL = nanoid(10);
            let address = "";
            
            await client.hSet(shortURL, [
                'url', url,
                'expireAt', expireAt,
            ]);
        
            if(process.env.NODE_ENV === 'production') {
                address = `https://short--url.herokuapp.com/${shortURL}`;
            }
            else{
                address = `http://localhost:${PORT}/${shortURL}`;
            }

            res.status(200).json({"id" : shortURL, "shortUrl" : address});
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;