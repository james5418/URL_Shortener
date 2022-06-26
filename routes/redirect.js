const router = require("express").Router();
const client = require("../utils/redis_client");
const check_date = require("../utils/validation");
const PORT = process.env.PORT || 8000;


router.get('/:id', async(req, res) => {
    try{
        const url_id = req.params.id;
        const long_url = await client.hGetAll(url_id);

        if(long_url.url && check_date(long_url.expireAt)){
            res.redirect(long_url.url);
        }
        else{
            await client.hSet(url_id, [
                'url', null,
                'expireAt', null,
            ]);

            res.status(404).send(`${url_id} not found`);
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;