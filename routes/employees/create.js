const models = require('../../models/index')
const router = require('express').Router()


function createEmployee(req, res) {
    models.users.create({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        age:req.body.age,
        gender:req.body.gender,
        password:req.body.password,
        role:'Employee',
        department:req.body.department,
        designation:req.body.designation

    })
    .then(users=> {
        res.json({users,message: 'employee created'});
    })
    .catch(error=>{
        res.json({
            error:'employee can not be created'
        })
    })
}

router.post("/create", createEmployee)
module.exports = exports = router