const models = require('../../models/index')
const router = require('express').Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const sequelize = models.sequelize;

function EmployeePasswordChange(req, res) {
    return sequelize.transaction((t) => {
        var hashedPassword
        return argon2.hash(req.body.password)
            .then((hash) => {
                hashedPassword = hash
                return models.users.findOne({
                    where: { user_id: req.body.user_id }
                })
            })
            .then((users) => {
                users.password = hashedPassword;
                users.email = req.body.email;
                users.first_login = 0
                return users.save({
                    transaction: t,
                })
            })
            .then(user => {
                user.token = [jwt.sign({ user_id: user.user_id }, 'lovevolleyball')]
                // res.json({message:'no need to change'})
                return user.save({
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

router.post('/changepassword', EmployeePasswordChange)
module.exports = exports = router