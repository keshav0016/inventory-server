const models = require('../models/index')
const router = require('express').Router()
const argon2 = require('argon2')
const sgMail = require('@sendgrid/mail');
const api = require('../config/sendGrid')


function forgotPasswordHandler(req, res, next){
    if(req.body.user_id === 'Admin' || req.body.user_id === 'admin'){
        if(req.body.email==="hr@westagilelabs.com"){
            models.users.find({where: {user_id : "Admin"}})
            .then(user => {
                sgMail.setApiKey(api)
                const msg = {
                    to : "veena.m@westagilelabs.com",
                    from : 'hr@westagilelabs.com'
                }
                let randomAdminPassword = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
                return argon2.hash(randomAdminPassword)
                .then(hashed => {
                    user.password = hashed
                    msg.subject = "Temporary Password for IMS"
                    msg.html = `<h4>Your Temporary password is ${randomAdminPassword}<br /><br />Thanks,<br />Team Admin</h4>`
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
            })
        }else{

            models.Admin.findOne({where : { email : req.body.email}})
            .then(admin => {
                sgMail.setApiKey(api)
                    const msg = {
                        to : req.body.email,
                        from : 'hr@westagilelabs.com'
                    }
                let randomAdminsPassword = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
                return argon2.hash(randomAdminsPassword)
                .then(hashed => {
                    admin.password = hashed
                    msg.subject = "Temporary Password for IMS"
                    msg.html = `<h4>Your Temporary password is ${randomAdminsPassword}<br /><br />Thanks,<br />Team Admin</h4>`
                    return admin.save()

                })
                .then(admin => {
                    res.json({message : 'Check Your Email'})
                    return sgMail.send(msg)
                })
                .then(() => {
                    console.log('mail sent')
                })
                .catch(error => {
                    res.json({error : error})
                })

            })
        }
    }else{

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
                    msg.html = `<h4>Your Temporary password is ${randomPassword}<br /><br />Thanks,<br />Team Admin</h4>`
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
}





router.post('/forgotPassword', forgotPasswordHandler)

module.exports = exports = router