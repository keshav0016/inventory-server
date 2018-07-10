const models = require('../../models/index')
const router = require('express').Router()
const api = require('../../config/sendGrid')
const sgMail = require('@sendgrid/mail');
const argon2 = require('argon2')

function enableEmployeeHandler(req, res, next){
    let temporaryPassword
    let randomPassword = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
    return argon2.hash(randomPassword)
    .then(hashed => {
        temporaryPassword = hashed
        return models.users.findOne({ where : {user_id : req.body.user_id}})
    })
    .then(user => {
        user.disable = 0;
        user.password = temporaryPassword;
        user.first_login = 1
        return user.save()
    })
    .then(user => {
        sgMail.setApiKey(api)
        const msg = {
            to : user.email,
            from : 'hr@westagilelabs.com'
            ,subject : 'Welcome Back to Westagilelabs'
            ,html : `<p>Hello ${user.first_name},<br /><br /><br />This is to inform you that you have been given access to Inventory Management Tool. Please use the credentials below to access. <br /><br /><br />User Id: ${user.user_id}<br />Password: ${randomPassword}<br /><br /><br />Please click on below link(copy paste in your browser) to access.<br /><br />Link: <a href='https://ims-tool.westagilelabs.com/'>https://ims-tool.westagilelabs.com/</a><br /><br />Thanks,<br /><br />TeamAdmin</p>  `
        }  
        return sgMail.send(msg)     
    })
    .then(() => {
        res.json({
            message : 'Employee ennabled successfully'
        })
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred enabling the Employee'
        })
    })
}





router.post('/enable', enableEmployeeHandler)

module.exports = exports = router