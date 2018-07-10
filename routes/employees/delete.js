const models = require('../../models/index')
const router = require('express').Router()
const api = require('../../config/sendGrid')
const sgMail = require('@sendgrid/mail');

function disableEmployeeHandler(req, res, next){
    let userDisable = 0;
    class StopPromise extends Error {}
    models.users.findOne({include: [{model : models.assets_assigned}], where : {user_id : req.body.user_id}})
    .then(user => {
        let checkAssetOccupied =  user.assets_assigneds.some(assets_assigned => {
            return assets_assigned.to === null
        });

        if(!checkAssetOccupied || user.assets_assigneds.length === 0){
            userDisable = 1;
        }
        else{
            userDisable = 0;
        }
        return Promise.resolve(user)        
    })
    .then(user =>{
        if(userDisable === 0){
            res.json({
                message : 'recover the assets first'
            })
            throw new StopPromise()
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
                ,subject : 'Account Deactivated'
                ,html : `<p>Hello ${user.first_name},<br /><br /><br />This Email is to inform you that Your account(Inventory Management Tool) access has been removed. please contact Admin department for further qyeries.<br /><br /><br />Thanks,<br />Team Admin </p>`
            }  
            return sgMail.send(msg)       
        }
    })
    .then(() => {
        res.json({
            message : 'Employee disabled successfully'
        })
    })
    .catch(StopPromise, () => {
        console.log('stopped promise')
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred deleting the Employee'
        })
    })
}





router.post('/disable', disableEmployeeHandler)

module.exports = exports = router