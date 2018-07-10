const models = require('../models/index')
const router = require('express').Router()
const argon2 = require('argon2')
const sgMail = require('@sendgrid/mail');
const api = require('../config/sendGrid')



function forgotPasswordHandler(req, res, next){
    models.users.findOne({where : {user_id : req.body.user_id, email : req.body.email}})
    .then(user => {
        if(user && user.disable === 0){
            sgMail.setApiKey(api)
            const msg = {
                to : user.email,
                from : 'hr@westagilelabs.com'
            }
            let randomPassword = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
            return argon2.hash(randomPassword)
            .then(hashed => {
                user.password = hashed
                msg.subject = "Temporary Password for IMS"
                msg.html = `<h4>Your Temporary password is ${randomPassword}<br /><br />Thanks,<br /><br />Team Admin</h4>`
                return user.save()
            })
            .then(user => {
                res.json({message : 'Check Your Email'})
                return sgMail.send(msg)
            })
            .then(() => {
                console.log('mail sent')
            })
            .catch(error => {
                res.json({error : error})
            })
        }
        if(user && user.disable === 1){
            res.json({
                message: 'User is Disabled'
            })
        }
        else{
            res.json({
                message : 'user ID and Email does not match'
            })
        }
    })
}





router.post('/forgotPassword', forgotPasswordHandler)

module.exports = exports = router