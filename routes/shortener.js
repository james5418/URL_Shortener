
const router = require("express").Router();


router.post('/', async(req, res) => {
    try{
        const {longUrl, expireAt} = req.body


        res.status(200).json({"success": true})
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;