const models = require('../../models/index')
const router = require('express').Router()
const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')
const sequelize = models.sequelize;

function createEmployee(req, res) {
    let randomPasswordAdmin = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)

    if (req.body.role === 'Admin') {
        return sequelize.transaction((t) => {
            let randomPassword = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
             return models.users.create({
                user_id: req.body.user_id,
                first_name: req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
                last_name: req.body.last_name.charAt(0).toUpperCase() + req.body.last_name.slice(1).toLowerCase(),
                password: randomPassword,
                age: req.body.age,
                gender: req.body.gender,
                role: req.body.role,
                department: req.body.department,
                designation: req.body.designation,
                disable: 0
                , email: req.body.email
                , first_login: 1
                , idSerialNo: req.body.idNo
            }, {
                    transaction: t,
                }).then(() => {
                    return models.Admin.create({
                        firstName: req.body.first_name,
                        lastName: req.body.last_name,
                        email: req.body.email,
                        password: randomPasswordAdmin,
                        firstLogin: 1
                    }, {
                            transaction: t,
                        })
                })
                .then(user => {
                    sgMail.setApiKey(api)
                    const msg = {
                        to: user.email,
                        from: 'hr@westagilelabs.com'
                        , subject: 'Welcome to Inventory Management System(IMS)'
                        , html: `<p>Hello ${req.body.first_name},<br /><br />Welcome to Inventory management system.Please use the below credentials to access the IMS. <br /><br />Employee Id: ${user.user_id}<br /> Password: ${randomPassword}<br/><br /> <br />Please <a href='https://ims-tool.westagilelabs.com/'>Click here</a> to login.<br /><br />Thanks,<br />Team Admin</p>`
                    }
                    return sgMail.send(msg)
                })
                .then(admin => {
                    sgMail.setApiKey(api)
                    const msg = {
                        to: 'ishaan.g@westagilelabs.com',
                        from: 'hr@westagilelabs.com'
                        , subject: 'Welcome to Inventory Management System(IMS)'
                        , html: `<p>Hello ${req.body.first_name} ${req.body.last_name},<br /><br />Welcome to Inventory management system. You are now an Admin for IMS Tool. Please use the below credentials to access the IMS. <br /><br />Employee Id: ${admin.email}<br /> Password: ${randomPasswordAdmin}<br/><br /> <br />Please <a href='https://ims-tool.westagilelabs.com/'>Click here</a> to login.<br /><br />Thanks,<br />Team Admin</p>`
                    }
                    return sgMail.send(msg)

                })
        }).then(() => {
            res.json({ message: 'admin created' });
        })
            .catch(SequelizeValidationError => {
                res.json({
                    error: SequelizeValidationError.errors
                })
            })
            .catch(error => {
                res.json({
                    error: error
                })
            })
    } else {
        return sequelize.transaction((t) => {
            let randomPassword = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6)
             return models.users.create({
                user_id: req.body.user_id,
                first_name: req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1).toLowerCase(),
                last_name: req.body.last_name.charAt(0).toUpperCase() + req.body.last_name.slice(1).toLowerCase(),
                password: randomPassword,
                age: req.body.age,
                gender: req.body.gender,
                role: req.body.role,
                department: req.body.department,
                designation: req.body.designation,
                disable: 0
                , email: req.body.email
                , first_login: 1
                , idSerialNo: req.body.idNo
            }, {
                    transaction: t,
                })
                .then(user => {
                    sgMail.setApiKey(api)
                    const msg = {
                        to: user.email,
                        from: 'hr@westagilelabs.com'
                        , subject: 'Welcome to Inventory Management System(IMS)'
                        , html: `<p>Hello ${user.first_name},<br /><br />Welcome to Inventory management system.Please use the below credentials to access the IMS. <br /><br />Employee Id: ${user.user_id}<br /> Password: ${randomPassword}<br/><br /> <br />Please <a href='https://ims-tool.westagilelabs.com/'>Click here</a> to login.<br /><br />Thanks,<br />Team Admin</p>`
                    }
                    return sgMail.send(msg)
                })
        })
            .then(() => {
                res.json({ message: 'employee created' });

            })
            .catch(SequelizeValidationError => {
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
}

router.post("/create", createEmployee)
module.exports = exports = router
