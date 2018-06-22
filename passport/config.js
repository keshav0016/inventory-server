const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const models = require('../models/index')

module.exports = exports = new LocalStrategy({usernameField : 'user_id', passwordField : 'password', passReqToCallback : true},
    function (req, username, password, done){
        console.log('passport')
        models.users.findOne({ where: { user_id : req.body.user_id.charAt(0).toUpperCase() + req.body.user_id.slice(1).toLowerCase()}})
        .then(user=>{
            if(!user){
                return done(null,false)
            }
            else{
                models.users.verifyPassword(req.body.password, user)
                .then(match=>{
                    if(match){
                        return done(null, true)
                    }else{

                        return done(null, false, {message : 'incorrect password'})

                    }
                })             
            }
        }) 
        .catch(error=>{
            return done(error)
        })
       
    } 
)

