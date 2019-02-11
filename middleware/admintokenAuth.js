
const express=require('express')
const app = express();
const models = require('../models/index.js')
const jwt= require('jsonwebtoken')


function admintokenMiddleware(req,res,next){
    var receivedToken=req.cookies.token ? req.cookies.token : req.headers.token;
    if(receivedToken){
        var decodedtoken = jwt.verify(receivedToken,'lovevolleyball');
        if(decodedtoken.email){
            models.Admin.scope('withoutPassword').findOne({ where : {email:decodedtoken.email ,token : {$contains : [receivedToken]}}})
            .then(admin=>{
                if(admin){
                    req.currentUser=admin;
                    res.clearCookie('passwordChange')
                    res.cookie('token', receivedToken, {encode : String, maxAge : 1000 * 60 * 15});                
                    next()
                    
                }else{
                    res.status(403).send('Admin not found' )
                }
            })
            .catch(error=>{
                next(error)
            })
        }else if(decodedtoken.user_id === 'Admin'){
            models.users.scope('withoutPassword').findOne({ where : {user_id : decodedtoken.user_id, token : {$contains : [receivedToken]}}})
            .then(user => {
                if(user){
                    req.currentUser = user;
                    res.clearCookie('passwordChange')
                    res.cookie('token', receivedToken, {encode : String, maxAge : 1000 * 60 * 15});                
                    next()
                }else{
                    res.status(403).send('Admin not found' )
                }
            })
            .catch(error=>{
                next(error)
            })
        }
        
    }
    else{
        res.clearCookie('passwordChange')                
        res.status(401).send('No token found')
    }
}
module.exports=exports= admintokenMiddleware