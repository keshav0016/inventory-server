const models = require('../../models/index')
const router = require('express').Router()


function currentUserHandler(req, res, next){
    res.json({
        currentUser : req.currentUser
    })
}



router.get('/current', currentUserHandler)

module.exports = exports = router