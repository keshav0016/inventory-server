const models = require('../../models/index')
const router = require('express').Router()

function deleteEmployee(req, res) {
    models.users.destroy({ where: { user_id: req.body.user_id, role : 'Employee' }})
    .then(user=> {
        res.json({user, message: 'employee deleted'});
    })
    .catch(error=>{
        res.json({
            error: 'employee can not be deleted'
        })
    })
}

router.post("/delete", deleteEmployee)
module.exports = exports = router