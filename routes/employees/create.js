const models = require('../../models/index')
const router = require('express').Router()


function createEmployee(req, res) {
    models.users.create({
        user_id: req.body.user_id,
        first_name:req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
        last_name:req.body.last_name.charAt(0).toUpperCase() + req.body.last_name.slice(1).toLowerCase(),
        password: req.body.user_id,
        age:req.body.age,
        gender:req.body.gender,
        role:'Employee',
        department:req.body.department,
        designation:req.body.designation.charAt(0).toUpperCase() + req.body.designation.slice(1).toLowerCase(),

    })
    .then(users=> {
        res.json({users,message: 'employee created'});
    })
    .catch(SequelizeValidationError=>{
        res.json({
            error: SequelizeValidationError.errors
        })
    })
    .catch(error => {
        res.json({
            error: error
        })
    })
}

router.post("/create", createEmployee)
module.exports = exports = router