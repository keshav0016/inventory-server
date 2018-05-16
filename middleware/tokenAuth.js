const express=require('express')
const app = express();
const models = require('../models/index.js')
const jwt= require('jsonwebtoken')


function tokenMiddleware(req,res,next){
    var receivedToken=req.cookies.token;
    var decodedtoken = jwt.verify(token,'lovevolleyball');
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
}
module.exports=exports=tokenMiddleware