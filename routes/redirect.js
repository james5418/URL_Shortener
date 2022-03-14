
const router = require("express").Router();


router.get('/:id', async(req, res) => {
    try{
        res.status(200).send('Redirect URL API')
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;