const models = require('../models/index')
const router = require('express').Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const cookieParser =require('cookie-parser')
const jwt = require('jsonwebtoken')


function login(req,res,next){
    
    models.users.findOne({ where:{user_id: req.body.user_id}})
    .then(user=>{
        user.token=[jwt.sign({ id : user.id},'lovevolleyball')]
        return user.save()    
    })
    .then((user) => {
        res.cookie('token',user.token[user.token.length-1],{encode:String})
        res.json({success: true, user_id: user.user_id, role: users.role, token:users.token})
    })
    .catch(error=>{
        next(error)
    })
}

router.post('/login', passport.authenticate('local',{session:false}), login)

module.exports = exports=router