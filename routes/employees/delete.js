const models = require('../../models/index')
const router = require('express').Router()
const tokenAuth = require('../../middleware/tokenAuth')

function deleteEmployee(req, res) {
    models.users.destroy({ where: { user_id: req.body.user_id, role : 'employee' }})
    .then(user=> {
        res.json({user, message: 'employee deleted'});
    })
    .catch(error=>{
        res.json({
            error: 'employee can not be deleted'
        })
    })
}
//router.use(tokenAuth)
router.post("/delete", deleteEmployee)
module.exports = exports = router