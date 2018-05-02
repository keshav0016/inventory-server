const models = require('../models/index')
const router = require('express').Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')


function login(req,res,next){
    var passwordSame = true
    models.users.findOne({ where: { user_id : req.body.user_id.charAt(0).toUpperCase() + req.body.user_id.slice(1).toLowerCase()}})
    .then(user=>{
        if(user){
            return  argon2.verify(user.password, user.user_id)            
        }
        else{
            res.json({
                message: 'user not found'
            })
        }
    })
    .then((match) => {
        if(match){
            passwordSame = true
        }else{
            passwordSame = false
                
        }
        return models.users.findOne({ where : {user_id:req.body.user_id.charAt(0).toUpperCase() + req.body.user_id.slice(1).toLowerCase()}})
       
    })
    .then((user) => {
        user.token=[jwt.sign({ user_id : user.user_id},'lovevolleyball')]
        res.cookie('token',user.token[user.token.length-1],{encode:String})     
        
        return user.save()  
    })
    .then((user) => {
        res.json({success: true,  passwordSame, user})

    })
    .catch(error=>{
        next(error)
    })
}

router.post('/login', passport.authenticate('local',{session:false}),  login)

module.exports = exports=router
