const models = require('../../models/index')
const router = require('express').Router()
const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')
const sequelize = models.sequelize;


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
                return sequelize.transaction((t) => {
                   return users.updateAttributes({
                        first_name:req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
                        last_name: req.body.last_name.charAt(0).toUpperCase() + req.body.last_name.slice(1).toLowerCase(),
                        age: req.body.age,
                        gender: req.body.gender,
                        designation: req.body.designation,
                        department:req.body.department,
                        email: req.body.email,
                        role : req.body.role,
                        idSerialNo : req.body.idNo
                    }, {
                        transaction: t,
                    })
                    .then(user => {
                        return models.Admin.create({
                            firstName : req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
                            lastName : req.body.last_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
                            email : req.body.email,
                            password : randomPasswordAdmin,
                            firstLogin : 1
                        },{
                            transaction: t,
                        })
                    })
                    .then(admin => {
                        sgMail.setApiKey(api)
                        const msg = {
                            to : admin.email,
                            from : 'hr@westagilelabs.com'
                            ,subject : 'Admin access'
                        ,html : `<p>Hello ${admin.firstName},<br /><br />Welcome to Inventory management system.Please use the below credentials to access the IMS as an admin. <br /><br />Employee Id: ${admin.email}<br /> Password: ${randomPasswordAdmin}<br/><br /> <br />Please <a href='https://ims-tool.westagilelabs.com/'>Click here</a> to login.<br /><br />Thanks,<br />Team Admin</p>`
                        }  
                        return sgMail.send(msg)       
                    })
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
                return sequelize.transaction((t) => {
                    return models.Admin.destroy({where : {email : req.body.email}, transaction: t})
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
                        role : req.body.role,
                        idSerialNo : req.body.idNo
                    }, {
                        transaction: t,
                    })
                })
                .then(admin => {
                    sgMail.setApiKey(api)
                    const msg = {
                        to : req.body.email,
                        from : 'hr@westagilelabs.com'
                        ,subject : 'Admin account deactivated'
                    ,html : `<p>Hello ${req.body.first_name},<br /><br />This Email is to inform you that you are no longer an Admin for IMS tool. Please contact Admin department for further queries.<br /><br />Thanks,<br />Team Admin</p>`
                    }  
                    return sgMail.send(msg)       
                })
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
            }else {
                return sequelize.transaction((t) => {
                    return users.updateAttributes({
                        first_name:req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
                        last_name: req.body.last_name.charAt(0).toUpperCase() + req.body.last_name.slice(1).toLowerCase(),
                        age: req.body.age,
                        gender: req.body.gender,
                        designation: req.body.designation,
                        department:req.body.department,
                        email: req.body.email,
                        role : req.body.role,
                        idSerialNo : req.body.idNo
                    })
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
