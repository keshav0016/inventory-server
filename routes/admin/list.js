const models = require('../../models/index')
const router = require('express').Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


function adminList(req,res){
    models.users.findAll({ where : {role : 'Admin'}})
    .then(user => {
        res.json({
            admins : user
        })
    })
    .catch(error => {
        console.log(error)
        res.json({
            error: error
        })
    })
}

router.get("/list", adminList)


module.exports = exports = router