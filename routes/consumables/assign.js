const models = require('../../models/index')
const router = require('express').Router()
const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')


function assignConsumableHandler(req, res, next){
    var consumableName;
    models.consumables.findOne({ where : {consumable_id : req.body.consumable_id, quantity : {gt : 0}}})
    .then(consumables => {
        consumableName = consumables.name
        var updated_quantity = consumables.quantity - req.body.quantity
        consumables.quantity = updated_quantity
        return consumables.save()
    })
    .then(consumables => {
        var newConsumableAssign = models.consumables_assigned.build({
            consumable_id : consumables.consumable_id,
            user_id : req.body.user_id,
            assigned_date : req.body.assigned_date,
            quantity : req.body.quantity
        })
        return newConsumableAssign.save()
    })
    .then(consumableAssign => {
        return models.users.findOne({ where : {user_id : req.body.user_id}})
        
    })
    .then(user => {
        sgMail.setApiKey(api)
        const msg = {
            to : user.email,
            from : 'hr@westagilelabs.com'
            ,subject : 'Welcome to Wal IMS'
        ,html : `<p>Hello ${user.first_name},<br/><br/>A Consumable called ${consumableName} has been assigned to you.<br /><br />Thanks,<br />Team Admin</p>`
        }  
        return sgMail.send(msg)      
       
    })
    .then(() => {
        res.json({
            message : "Consumable Assigned"
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "Consumable could not be assigned, Quantity too low."
        })
    })
}





router.post('/assign', assignConsumableHandler)

module.exports = exports = router