const models = require('../../models/index')
const router = require('express').Router()


function createEmployee(req, res) {
    models.users.create({
        user_id:req.body.user_id,
        name:req.body.name,
        password:req.body.password,
        role:req.body.role,
        department:req.body.department

    })
    .then(user=> {
        res.json({user,message: 'employee created'});
    })
    .catch(error=>{
        res.json({
            error:'employee can not be created'
        })
    })
}

router.post("/create", createEmployee)
module.exports = exports = router