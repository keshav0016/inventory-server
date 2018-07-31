const models = require('../models/index')
const router = require('express').Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

function PasswordChangeAuto(req,res){
    var reg = /^[a-zA-Z0-9._-]+@westagilelabs.com$/;
    var hashedPassword
    if(!reg.test(req.body.user_id)){
        return  argon2.hash(req.body.password)
        .then((hash) => {
            hashedPassword = hash
            return models.users.findOne({ where : {user_id : req.body.user_id}})
        })
        .then(user => {
            user.password = hashedPassword;
            user.first_login = 0;
            user.token=[jwt.sign({ user_id : user.user_id},'lovevolleyball')]

            return user.save()
        })
        .then(user => {

            res.json({
                message: 'password has been changed',
                
            })

        })
        .catch(error=>{
            res.json({
                error : error
            })
        })
        
    }else if(reg.test(req.body.user_id)){
        return  argon2.hash(req.body.password)
        .then(hash => {
            hashedPassword = hash
            return models.Admin.findOne({
                where : {email : req.body.user_id }
            })
        })
        .then(admin => {
            admin.password = hashedPassword;
            admin.firstLogin = 0;
            admin.token = [jwt.sign({ email : admin.email},'lovevolleyball')];
            return admin.save()
        })
        .then(admin => {
            res.json({
                message: 'password has been changed',
            })
        })
        .catch(error => {
            res.json({
                error : error
            })
        })
    }
    
   
}

router.post('/passwordchange',PasswordChangeAuto)
module.exports = exports = router