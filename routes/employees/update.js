const models = require('../../models/index')
const router = require('express').Router()


function updateEmployee(req, res) {
    models.users.findOne({
        where: {
            user_id: req.body.user_id
        }
    })
    .then(users=> {
        if (users) {
            users.updateAttributes({
                name:req.body.name,
                department:req.body.department
            })
            .then(function (user) {
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
