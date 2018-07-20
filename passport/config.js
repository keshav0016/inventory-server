const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const models = require('../models/index')

module.exports = exports = new LocalStrategy({usernameField : 'user_id', passwordField : 'password', passReqToCallback : true},
    function (req, username, password, done){
        var reg = /^[a-zA-Z0-9._-]+@westagilelabs.com$/;

        console.log('passport')
        if(reg.test(req.body.user_id)){
            models.Admin.findOne( { where : { email : req.body.user_id}})
            .then(admin => {
                if(!admin){
                    return done(null,false)
                }
                else {
                    models.Admin.verifyPassword(req.body.password, admin)
                    .then(match => {
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
        else {
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
       
       
    } 
)

