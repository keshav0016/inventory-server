const models = require('../../models/index')
const router = require('express').Router()
const tokenAuth = require('../../middleware/tokenAuth')


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
               department:req.body.department,
               password:req.body.password,
               role:req.body.role
                
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


//router.use(tokenAuth)
router.post("/update", updateEmployee)

module.exports = exports = router;
