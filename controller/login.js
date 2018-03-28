const models = require('../models/index')
const router = require('express').Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')


function login(req,res,next){
    models.users.findOne({ where:{first_name: req.body.username}})
    .then(user=>{
        user.token=[jwt.sign({ id : user.id},'lovevolleyball')]
        return user.save()    
    })
    .then((user) => {
        console.log('login')
        // res.cookie('token',user.token[user.token.length-1],{encode:String})
        res.json({success: true, user})
    })
    .catch(error=>{
        next(error)
    })
}

router.post('/login',  login)

module.exports = exports=router

// passport.authenticate('local',{session:false}),