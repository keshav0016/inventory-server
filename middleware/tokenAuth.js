const express=require('express')
const app = express();
const models = require('../models/index.js')
const jwt=require('jsonwebtoken')


function tokenMiddleware(req,res,next){
    var token=req.cookies.token;
    console.log('token found')
    var decodedtoken=jwt.verify(token,'lovevolleyball')
    models.users.findById(decodedtoken.id)
    .then(user=>{
        if(user){
            req.currentUser=user,
            next()
            
        }else{
            res.send('user not found' )
        }
    })
    .catch(error=>{
        next(error)
    })
}
module.exports=exports=tokenMiddleware