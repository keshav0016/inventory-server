const models = require('../models/index')
const argon2 = require('argon2')
const router = require('express').Router()


function resetPasswordHandler(req, res, next){
    models.users.findOne({where : {user_id : req.body.user_id}})
    .then(user => {
        if(user){
            return argon2.verify(user.password, req.body.emailPassword)            
        }
        else{
            res.json({
                message: 'user not found'
            })
        }
    })
    .then(match => {
        if(match){
            let hashedPassword
            return argon2.hash(req.body.password)
            .then(hashed => {
                hashedPassword = hashed
                return models.users.findOne({where : {user_id : req.body.user_id}})
            })
            .then(user => {
                user.password = hashedPassword,
                user.first_login = 0
                return user.save()
            })
            .then(user => {
                res.json({
                    message : 'password has been changed'
                })
            })
        }
    })
    .catch(error => {
        res.json({
            error : error
        })
    })
}




router.post('/reset', resetPasswordHandler)


module.exports = exports = router