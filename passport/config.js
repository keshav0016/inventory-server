const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const models = require('../models/index')

module.exports = exports = new LocalStrategy({usernameField : 'user_id', passwordField : 'password', passReqToCallback : true},
    function (req, username, password, done){
        models.users.findOne({ where: { user_id : req.body.user_id }})
        .then(user=>{
            if(!user){
                return done(null, false, {message : 'incorrect username'})
            }
            else{
                models.users.verifyPassword(req.body.password, user)
                .then(same=>{
                    if(same){
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


// module.exports= passport;
