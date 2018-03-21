const models = require('../models/index.js')
const router = require('express').Router()
const tokenauth = require('../middleware/tokenauth')


function create(req, res) {
    console.log('got near create')
    models.users.create({
        user_id:req.body.user_id,
        password:req.body.password,
        role:req.body.role,
        department:req.body.department

    }).then(function (user) {
        res.json(user);
    })
}

//router.use(tokenauth)
router.post("/create", create)
modules.exports = exports = router