const models = require('../../models/index')
const router = require('express').Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const sequelize = models.sequelize;

function AdminPasswordChange(req, res) {
    return sequelize.transaction((t) => {
        var hashedPassword;
        return argon2.hash(req.body.password)
            .then((hash) => {
                hashedPassword = hash
                return models.Admin.findOne({
                    where: { email: req.body.user_id }
                })
            })
            .then((admin) => {
                admin.password = hashedPassword;
                // admin.email = req.body.email;
                admin.firstLogin = 0
                return admin.save({
                    transaction: t,
                })
            })
            .then(admin => {
                admin.token = [jwt.sign({ email: admin.email }, 'lovevolleyball')]
                // res.json({message:'no need to change'})
                return admin.save({
                    transaction: t,
                })

            })
    })
        .then(user => {
            res.json({
                message: 'password has been changed',

            })
        })
        .catch(error => {
            res.json({
                error: error
            })
        })

}

router.post('/changepassword', AdminPasswordChange)
module.exports = exports = router