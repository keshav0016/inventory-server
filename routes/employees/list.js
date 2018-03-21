const models = require('../../models/index')
const router = require('express').Router()
const tokenAuth = require('../../middleware/tokenAuth')


function listEmployee(req, res) {
    models.users.findAll({
        where:{role:'employee'}
    })
    .then(function (user) {
        res.json(user);
    })
}

//router.use(tokenAuth)
router.get("/list", listEmployee)
module.exports = exports = router