const models = require('../models/index')
const router = require('express').Router()
const passport = require('../passport/config')
const LocalStrategy = require('passport-local').Strategy
const cookieParser =require('cookie-parser')
const jwt = require('jsonwebtoken')


function login(req,res,next){
    
    models.users.findOne({ where:{username: req.body.username}})
    .then(user=>{
        users.token=[jwt.sign({id:users.id},'lovevolleyball')]
        users.save()
        .then(()=>{
            res.cookie('token',users.token[users.token.length-1],{encode:String})
            res.json({success: true, username: users.username, role: users.role,token:users.token})
        })
        .catch(error=>{
            next(error)
        })
        
    })
    .catch(error=>{
        next(error)
    })
}

router.post('/login',passport.authenticate('local',{session:false}),login)

module.exports = exports=router