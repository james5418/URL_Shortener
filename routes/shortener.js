const router = require("express").Router();
const shortid = require("shortid");
const isUrl = require("is-valid-http-url");
const client = require("../redis_client");
const moment = require('moment');

const check_date = (expire_date) => {
    let valid = moment(expire_date, "YYYY-MM-DDTHH:mm:ssZ", true).isValid();
    let now = new Date();
    let isafter = moment(expire_date).isAfter(now);

    return (valid&&isafter ? true : false);
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
            const shortURL = shortid.generate();
            
            await client.hSet(shortURL, [
                'id', shortURL,
                'url', url,
                'expireAt', expireAt,
            ]);
        
            res.status(200).json({"id" : shortURL, "shortUrl" : `http://localhost:8000/${shortURL}`});
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;