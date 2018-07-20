const models = require('../models/index')
const router = require('express').Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')


function login(req,res,next){
    var reg = /^[a-zA-Z0-9._-]+@westagilelabs.com$/;
    var passwordSame = true
    class userDisabled extends Error{}
    if(reg.test(req.body.user_id)){
        models.Admin.findOne({where : {email : req.body.user_id}})
        .then(admin => {
            return argon2.verify(admin.password, req.body.password)
        })
        .then((match) => {
            if(match){
                passwordSame = true
            }else{
                passwordSame = false
                    
            }
            return models.Admin.scope('withoutPassword').findOne({ where : {email : req.body.user_id}})

        })
        .then(admin => {
            newToken = jwt.sign({ email : admin.email, /* exp: Math.floor(Date.now() / 1000) + (5) */},'lovevolleyball')
            if(admin.token){
                admin.token.push(newToken)
            } else{
                admin.token = [newToken]
            }
            // res.cookie('token',user.token[user.token.length-1],{encode:String})
            res.cookie('token', newToken, {encode : String, maxAge : 1000 * 60 * 15});     
            return admin.update({
                token : admin.token
            })
        })
        .then((admin) => {
            res.json({success: true,  passwordSame, admin})
        })
        .catch(userDisabled, () => {
            console.error('user is disabled')
        })
        .catch(error=>{
            next(error)
        })
    }else{

        models.users.findOne({ where: {user_id : req.body.user_id.charAt(0).toUpperCase() + req.body.user_id.slice(1).toLowerCase()}})
        .then(user=>{
            if(user && user.disable !== 1){
                return  argon2.verify(user.password, req.body.password)            
            }if(user && user.disable === 1){
                res.json({
                    message: "User is disabled"
                })
                throw new userDisabled()
            }
            else{
                res.json({
                    message: 'user not found ',
                })
            }
        })
        .then((match) => {
            if(match){
                passwordSame = true
            }else{
                passwordSame = false
                    
            }
            return models.users.scope('withoutPassword').findOne({ where : {user_id:req.body.user_id.charAt(0).toUpperCase() + req.body.user_id.slice(1).toLowerCase()}})
        
        })
        .then((user) => {
            // user.token=[jwt.sign({ user_id : user.user_id},'lovevolleyball')]
            newToken = jwt.sign({ user_id : user.user_id, /* exp: Math.floor(Date.now() / 1000) + (5) */},'lovevolleyball')
            if(user.token){
                user.token.push(newToken)
            } else{
                user.token = [newToken]
            }
            // res.cookie('token',user.token[user.token.length-1],{encode:String})
            res.cookie('token', newToken, {encode : String, maxAge : 1000 * 60 * 15});     
            return user.update({
                token : user.token
            })
            // return user.save()  
        })
        .then((user) => {
            res.json({success: true,  passwordSame, user})
        })
        .catch(userDisabled, () => {
            console.error('user is disabled')
        })
        .catch(error=>{
            next(error)
        })
    }
    
}

router.post('/login', passport.authenticate('local',{session:false}),  login)

module.exports = exports=router
