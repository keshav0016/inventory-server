const express=require('express')
const app = express();
const models = require('../models/index.js')
const jwt= require('jsonwebtoken')


function admintokenMiddleware(req,res,next){
    var receivedToken=req.cookies.token;
    if(receivedToken){
        var decodedtoken = jwt.verify(receivedToken,'lovevolleyball');
        models.users.scope('withoutPassword').findOne({ where : {user_id:decodedtoken.user_id , role : 'Admin',token : {$contains : [receivedToken]}}})
        .then(user=>{
            if(user){
                req.currentUser=user,
                next()
                
            }else{
                res.status(403).send('Admin not found' )
            }
        })
        .catch(error=>{
            next(error)
        })
    }
    else{
        res.status(401)
    }
}
module.exports=exports= admintokenMiddleware