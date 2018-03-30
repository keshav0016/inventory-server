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
<<<<<<< HEAD
                first_name:req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
                last_name: req.body.last_name.charAt(0).toUpperCase() + req.body.last_name.slice(1).toLowerCase(),
                age: req.body.age,
                gender: req.body.gender,
                designation: req.body.designation,
                department:req.body.department.charAt(0).toUpperCase() + req.body.department.slice(1).toLowerCase(),
=======
                first_name:req.body.first_name,
                last_name: req.body.last_name,
                age: req.body.age,
                gender: req.body.gender,
                designation: req.body.designation,
                department:req.body.department
>>>>>>> 077637503c7978336ce67c3ef4a1639093ff0766
            })
            .then(function (user) {
                console.log(user)
                res.json({user, message: 'employee has been updated'});
            });
        }
    })
    .catch(error=>{
        res.json({
            error: error
        })
    })
}


router.post("/update", updateEmployee)

module.exports = exports = router;
