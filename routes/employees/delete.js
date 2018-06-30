const models = require('../../models/index')
const router = require('express').Router()
const api = require('../../config/sendGrid')
const sgMail = require('@sendgrid/mail');

function disableEmployeeHandler(req, res, next){
    let userDisable = 0;
    models.users.findOne({include: [{model : models.assets_assigned}], where : {user_id : req.body.user_id}})
    .then(user => {
        user.assets_assigneds.forEach(assets_assigned => {
            if(assets_assigned.to === null){
                userDisable = 0;
                return Promise.resolve(user)
            }else{
                userDisable = 1;
            }
        });
        if(user.assets_assigneds.length === 0){
            userDisable = 1;
        }
        return Promise.resolve(user)        
    })
    .then(user =>{
        if(userDisable === 0){
            res.json({
                message : 'recover the assets first'
            })
        }
        else{
            user.disable = 1;
            return user.save()
        }
    })
    .then(user => {
        if(user){
            sgMail.setApiKey(api)
            const msg = {
                to : user.email,
                from : 'hr@westagilelabs.com'
                ,subject : 'Regarding Termination'
                ,html : `<p>Hello ${user.first_name},<br />This Email is to inform you that You will no longer be able to use the West Agile Labs's Inventory Management Tool. `
            }  
            return sgMail.send(msg)       
        }
    })
    .then(() => {
        res.json({
            message : 'Employee disabled successfully'
        })
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred deleting the Employee'
        })
    })
}





router.post('/disable', disableEmployeeHandler)

module.exports = exports = router