const models = require('../../models/index')
const router = require('express').Router()
const tokenAuth = require('../../middleware/tokenAuth')


function updateEmployee(req, res) {
    models.users.findOne({
        where: {
            user_id: req.body.user_id
        }
    })
    .then(function (user) {
        if (user) {
            users.updateAttributes({
               department:req.body.department,
               password:req.body.password,
               role:req.body.role
                
            }).then(function (user) {
                res.json(user);
            });
        }
    });
}


//router.use(tokenAuth)
router.post("/update", updateEmployee)

module.exports = exports = router;
