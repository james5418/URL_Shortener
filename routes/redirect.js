const router = require("express").Router();
const client = require('../redis_client');
const moment = require('moment');
const PORT = process.env.PORT || 8000;

const check_expire = (expire_date) => {
    let now = new Date();
    let isafter = moment(expire_date).isAfter(now);
    return (isafter ? true : false);
}

router.get('/:id', async(req, res) => {
    try{
        const url_id = req.params.id;
        const long_url = await client.hGetAll(url_id);

        if(long_url.url && check_expire(long_url.expireAt)){
            res.redirect(long_url.url);
        }
        else{
            res.status(404).send(`localhost:${PORT}/${url_id} not found`)
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;