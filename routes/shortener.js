const router = require("express").Router();
const {nanoid} = require("nanoid");
const isUrl = require("is-valid-http-url");
const client = require("../utils/redis_client");
const check_date = require("../utils/validation");
const PORT = process.env.PORT || 8000;

if(process.env.NODE_ENV === 'production') {
	HOST = 'https://short--url.herokuapp.com'
}
else{
	HOST = 'http://localhost'
}

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
            
            await client.hSet(shortURL, [
                'url', url,
                'expireAt', expireAt,
            ]);
        
            res.status(200).json({"id" : shortURL, "shortUrl" : `${HOST}:${PORT}/${shortURL}`});
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;