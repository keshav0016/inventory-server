const express=require('express')
const app = express();
const models = require('../models/index.js')
const jwt= require('jsonwebtoken')


function verify(req,res,next){
    console.log('user token')
    var token = req.cookies.token ? req.cookies.token : req.headers.token;
    if (token){
        var decodedtoken = jwt.verify(token,'lovevolleyball');
        if(decodedtoken.user_id){

            models.users.findOne({ where : {user_id:decodedtoken.user_id }})
            .then(user=>{
                if(user){
                    req.currentUser=user,
                    console.log(req.currentUser.user_id)
                    next()
                    
                }else{
                    res.send('user not found' )
                }
            })
            .catch(error=>{
                next(error)
            })
        }else if(decodedtoken.email){
            models.Admin.findOne({where : {email : decodedtoken.email}})
            .then(admin => {
                if(admin){
                    req.currentUser = admin,
                    console.log(req.currentUser.email)
                    next()
                }else {
                    res.send('user not found')
                }
            })
            .catch(error=>{
                next(error)
            })
        }
        
    }
    else{
        next()
    }
}
module.exports=exports=verify