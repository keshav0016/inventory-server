const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const models = require('../models/index')

module.exports = exports = new LocalStrategy({usernameField : 'username', passwordField : 'password', passReqToCallback : true},
    function (req, username, password, done){
        console.log('passport')
        models.users.findOne({ where: { first_name : req.body.username }})
        .then(user=>{
            if(!user){
                return done(null, false, {message : 'incorrect username'})
            }else{
                return done(null,true)
            }
            // else{
            //     models.users.verifyPassword(req.body.password, user)
            //     .then(same=>{
            //         if(same){
            //             return done(null, true)
            //         }else{
            //             return done(null, false, {message : 'incorrect password'})
            //         }
            //     })             
            // }
        }) 
        .catch(error=>{
            return done(error)
        })
       
    } 
)

