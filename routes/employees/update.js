const models = require('../../models/index')
const router = require('express').Router()


function updateEmployee(req, res) {
    models.users.findOne({
        where: {
            id: req.body.id
        }
    })
    .then(users=> {
        if (users) {
            users.updateAttributes({
                first_name:req.body.first_name,
                last_name: req.body.last_name,
                age: req.body.age,
                gender: req.body.gender,
                designation: req.body.designation,
                department:req.body.department
            })
            .then(function (user) {
                console.log(user)
                res.json({user, message: 'employee has been updated'});
            });
        }
    })
    .catch(error=>{
        res.json({
            error: 'employee can not be updated'
        })
    })
}


router.post("/update", updateEmployee)

module.exports = exports = router;
