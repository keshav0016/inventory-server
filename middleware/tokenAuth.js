const express=require('express')
const app = express();
const models = require('../models/index.js')
const jwt= require('jsonwebtoken')


function tokenMiddleware(req,res,next){
    var receivedToken=req.cookies.token;
<<<<<<< HEAD
    if(receivedToken){
        var decodedtoken = jwt.verify(receivedToken,'lovevolleyball');
        models.users.findOne({ where : {user_id:decodedtoken.user_id,role:'Employee', token :{$contains : [receivedToken]}  }})
        .then(user=>{
            if(user){
                req.currentUser=user,
                next()
                
            }else{
                res.status(403).send('Employee not found' )
            }
        })
        .catch(error=>{
            next(error)
        })
    }
    else{
        res.status(401)
    }
=======
    var decodedtoken = jwt.verify(receivedToken,'lovevolleyball');
    models.users.findOne({ where : {user_id:decodedtoken.user_id,role:'Employee', token :{$contains : [receivedToken]}  }})
    .then(user=>{
        if(user){
            req.currentUser=user,
            next()
            
        }else{
            res.send('Employee not found' )
        }
    })
    .catch(error=>{
        next(error)
    })
>>>>>>> f18ca0f8c9bdc6a38899d1f6151833c05da80a8c
}
module.exports=exports=tokenMiddleware