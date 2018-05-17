const models = require('../../models/index')
const router = require('express').Router()
const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')


function createEmployee(req, res) {
    models.users.create({
        user_id: req.body.user_id,
        first_name:req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
        last_name:req.body.last_name.charAt(0).toUpperCase() + req.body.last_name.slice(1).toLowerCase(),
        password: req.body.user_id,
        age:req.body.age,
        gender:req.body.gender,
        role:'Employee',
        department:req.body.department,
        designation:req.body.designation,
        disable: 0
        ,email : req.body.email
    })
    .then(user => {
        sgMail.setApiKey(api)
        const msg = {
            to : user.email,
            from : 'hr@westagilelabs.com'
            ,subject : 'Welcome to Wal Inventory management system'
            ,html : `<p>Hello ${user.first_name},<br />Welcome to the west agile labs' Inventory management system.<br /><br />Your username and password for the WAL IMS is ${user.user_id}<br/>Please <a href='https://inventory-server-wal.herokuapp.com/login'>Click here</a> to login</p>`
        }  
        return sgMail.send(msg)              
    })
    .then(() => {
        res.json({message: 'employee created'});
    })
    .catch(SequelizeValidationError=>{
        res.json({
            error: SequelizeValidationError.errors
        })
    })
    .catch(error => {
        res.json({
            error: error
        })
    }) 
}

router.post("/create", createEmployee)
module.exports = exports = router
