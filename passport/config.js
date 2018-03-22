const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const models = require('../models/index')

module.exports = exports = new LocalStrategy( function (user_id, password, done){
        
        models.users.findOne({
            
            where: {
                user_id : user_id
               
            }
        })
        .then(user=>{
            if(!user){
                return done(null,false,{message:'incorrect username'})
            }else{
                users.validPassword(password)
                .then(same=>{
                    if(same){
                        return done(null,true)
                    }else{
                        return done(null,false,{message:'incorrect password'})
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
