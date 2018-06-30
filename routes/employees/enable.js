const models = require('../../models/index')
const router = require('express').Router()
const api = require('../../config/sendGrid')
const sgMail = require('@sendgrid/mail');

function enableEmployeeHandler(req, res, next){
    models.users.findOne({ where : {user_id : req.body.user_id}})
    .then(user => {
        user.disable = 0;
        return user.save()
    })
    .then(user => {
        sgMail.setApiKey(api)
        const msg = {
            to : user.email,
            from : 'hr@westagilelabs.com'
            ,subject : 'Welcome to Wal Inventory management system'
            ,html : `<p>Hello ${user.first_name},<br />This Email is to inform you that You will now be able to use the West Agile Labs's Inventory Management Tool with your previous credentials. `
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