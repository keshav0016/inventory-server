const models = require('../../models/index')
const router = require('express').Router()


function listEmployee(req, res) {
    var page = req.query.page || 1
    var department = req.query.department || "%"
    models.users.findAll({
        where:{role:'employee', department : {like : department}},
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

router.get("/list", listEmployee)
module.exports = exports = router