const models = require('../models/index')
const router = require('express').Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const sequelize = models.sequelize;

function PasswordChange(req, res) {
    var hashedPassword
    var currentUser = req.currentUser
    var passwordChange = true
    return sequelize.transaction((t) => {
        return argon2.hash(req.body.password)
            .then((hash) => {
                hashedPassword = hash
                return argon2.verify(currentUser.password, req.body.currentPassword)

            })
            .then(match => {
                if (match) {
                    if (currentUser.user_id) {

                        return models.users.findOne({
                            where: { user_id: currentUser.user_id }
                        })
                    } else if (user.email) {
                        return models.Admin.findOne({
                            where: { email: currentUser.email }
                        })
                    }
                } else {
                    res.json({
                        message: 'Current password is wrong'
                    })
                }
            })
            .then((user) => {
                user.password = hashedPassword;
                // admin.email = req.body.email;
                return user.save({
                    transaction: t,
                })
            })
            .then(user => {
                if (currentUser.email) {
                    user.token = [jwt.sign({ email: user.email }, 'lovevolleyball')]
                } else if (currentUser.user_id) {
                    user.token = [jwt.sign({ user_id: user.user_id }, 'lovevolleyball')]
                }
                // res.json({message:'no need to change'})
                return user.save({
                    transaction: t,
                })

            })
    })
        .then(user => {
            res.clearCookie('token')
            res.cookie('passwordChange', passwordChange)
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

router.post('/changespassword', PasswordChange)
module.exports = exports = router