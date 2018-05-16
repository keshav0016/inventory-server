const express=require('express')
const app = express();
const models = require('../models/index.js')
const jwt= require('jsonwebtoken')


function admintokenMiddleware(req,res,next){
    var receivedToken=req.cookies.token;
    var decodedtoken = jwt.verify(token,'lovevolleyball');
    models.users.findOne({ where : {user_id:decodedtoken.user_id , role : 'Admin',token : {$contains : [receivedToken]}}})
    .then(user=>{
        if(user){
            req.currentUser=user,
            next()
            
        }else{
            res.send('Admin not found' )
        }
    })
    .catch(error=>{
        next(error)
    })
}
module.exports=exports= admintokenMiddleware