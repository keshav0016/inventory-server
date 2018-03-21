const models = require('../../models/index')
const router = require('express').Router()
const tokenAuth = require('../../middleware/tokenAuth')

function deleteEmployee(req, res) {
    models.users.destroy({
        where: {
            user_id: req.body.user_id
        }
    }).then(function (user) {
        res.json(user);
    });
}
//router.use(tokenAuth)
router.post("/delete", deleteEmployee)
module.exports = exports = router