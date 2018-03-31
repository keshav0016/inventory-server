const models = require('../../models/index')
const router = require('express').Router()

function deleteEmployee(req, res) {
    models.users.destroy({ where: { id: req.body.id, role : 'Employee' }})
    .then(user=> {
        res.json({user, message: 'employee deleted'});
    })
    .catch(error=>{
        res.json({
            error: error
        })
    })
}

router.post("/delete", deleteEmployee)
module.exports = exports = router