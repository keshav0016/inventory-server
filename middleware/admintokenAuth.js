const express=require('express')
const app = express();
const models = require('../models/index.js')
const jwt= require('jsonwebtoken')


function admintokenMiddleware(req,res,next){
    var receivedToken=req.cookies.token;
    if(receivedToken){
        var decodedtoken = jwt.verify(receivedToken,'lovevolleyball');
        models.Admin.scope('withoutPassword').findOne({ where : {email:decodedtoken.email ,token : {$contains : [receivedToken]}}})
        .then(admin=>{
            if(admin){
                req.currentUser=admin;
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
    else{
        res.status(401).send('No token found')
    }
}
module.exports=exports= admintokenMiddleware