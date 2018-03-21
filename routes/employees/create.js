const models = require('../../models/index')
const router = require('express').Router()
const tokenAuth = require('../../middleware/tokenAuth')


function createEmployee(req, res) {
    models.users.create({
        user_id:req.body.user_id,
        password:req.body.password,
        role:req.body.role,
        department:req.body.department

    }).then(function (user) {
        res.json(user);
    })
}

//router.use(tokenAuth)
router.post("/create", createEmployee)
module.exports = exports = router