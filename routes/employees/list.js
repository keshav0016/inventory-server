const models = require('../../models/index')
const router = require('express').Router()
const tokenAuth = require('../../middleware/tokenAuth')


function listEmployee(req, res) {
    var page = req.query.page
    models.users.findAll({
        where:{role:'employee'},
        limit: 10,
        offset: (page - 1) * 10
    })
    .then(user=> {
        res.json({user, message:'employees list is found'});
    })
    .catch(error=>{
        res.json({
            error: 'employees list can not be found'
        })
    })
}

//router.use(tokenAuth)
router.get("/list", listEmployee)
module.exports = exports = router