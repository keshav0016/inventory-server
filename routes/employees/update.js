const models = require('../../models/index')
const router = require('express').Router()
const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')


function updateEmployee(req, res) {
    let randomPasswordAdmin = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
    models.users.findOne({
        where: {
            user_id: req.body.user_id
        }
    })
    .then(users=> {
        if (users) {
            if( users.role === "Employee" && req.body.role === "Admin"){

                users.updateAttributes({
                    first_name:req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
                    last_name: req.body.last_name.charAt(0).toUpperCase() + req.body.last_name.slice(1).toLowerCase(),
                    age: req.body.age,
                    gender: req.body.gender,
                    designation: req.body.designation,
                    department:req.body.department,
                    email: req.body.email,
                    role : req.body.role
                })
                .then(user => {
                    return models.Admin.create({
                        firstName : req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
                        lastName : req.body.last_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
                        email : req.body.email,
                        password : randomPasswordAdmin,
                        firstLogin : 1
                    })
                })
                .then(admin => {
                    sgMail.setApiKey(api)
                    const msg = {
                        to : admin.email,
                        from : 'veena.m@westagilelabs.com'
                        ,subject : 'Welcome to Inventory Management System(IMS)'
                    ,html : `<p>Hello ${admin.firstName},<br /><br />Welcome to Inventory management system.Please use the below credentials to access the IMS as admin. <br /><br />Employee Id: ${admin.email}<br /> Password: ${randomPasswordAdmin}<br/><br /> <br />Please <a href='https://ims-tool.westagilelabs.com/'>Click here</a> to login.<br /><br />Thanks,<br />Team Admin</p>`
                    }  
                    return sgMail.send(msg)       
                })
                .then(() => {
                    res.json({message: 'employee has been updated'});

                })
                .catch(SequelizeValidationError=>{
                    console.log(SequelizeValidationError)
                    res.json({
                        error: SequelizeValidationError.errors
                    })
                })
            }else if(users.role === "Admin" && req.body.role === 'Employee'){
                models.Admin.destroy({where : {email : req.body.email}})
                // models.Admin.destroy({where : {email : req.body.email}})
                .then(admin => {
                    // admin.destroy
                    sgMail.setApiKey(api)
                    const msg = {
                        to : req.body.email,
                        from : 'veena.m@westagilelabs.com'
                        ,subject : 'Admin account deactivated'
                    ,html : `<p>Hello ${req.body.first_name},<br /><br />This Email is to inform you that you are no longer a Admin for IMS tool. Please contact Admin department for further queries.<br /><br />Thanks,<br />Team Admin</p>`
                    }  
                    return sgMail.send(msg)       
                })
                .then(() => {
                    return models.users.findOne({where : {email : req.body.email}})
                })
                .then(users => {

                    users.updateAttributes({
                        first_name:req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
                        last_name: req.body.last_name.charAt(0).toUpperCase() + req.body.last_name.slice(1).toLowerCase(),
                        age: req.body.age,
                        gender: req.body.gender,
                        designation: req.body.designation,
                        department:req.body.department,
                        email: req.body.email,
                        role : req.body.role
                    })
                    .then(function (user) {
                        res.json({message: 'employee has been updated'});
                    })
                    .catch(SequelizeValidationError=>{
                        console.log(SequelizeValidationError)
                        res.json({
                            error: SequelizeValidationError.errors
                        })
                    })
                })
            }else {
                users.updateAttributes({
    
                    first_name:req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
                    last_name: req.body.last_name.charAt(0).toUpperCase() + req.body.last_name.slice(1).toLowerCase(),
                    age: req.body.age,
                    gender: req.body.gender,
                    designation: req.body.designation,
                    department:req.body.department,
                    email: req.body.email,
                    role : req.body.role
                })
                .then(function (user) {
                    res.json({message: 'employee has been updated'});
                })
                .catch(SequelizeValidationError=>{
                    console.log(SequelizeValidationError)
                    res.json({
                        error: SequelizeValidationError.errors
                    })
                })
            }
        }
    })
    .catch(error=>{
        res.json({
            error: error
        })
    })
}


router.post("/update", updateEmployee)

module.exports = exports = router;
