const router = require("express").Router();
const client = require('../redis_client');

router.get('/:id', async(req, res) => {
    try{
        const url_id = req.params.id;
        const long_url = await client.hGetAll(url_id);

        if(long_url.url){
            res.redirect(long_url.url);
        }
        else{
            res.status(404).send(`localhost:8000/${url_id} not found`)
        }
        
        // check expire day

    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;