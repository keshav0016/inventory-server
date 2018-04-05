const express=require('express')
const app = express();
const models = require('../models/index.js')
const jwt= require('jsonwebtoken')


function verify(req,res,next){
    console.log('user token')
    var token=req.cookies.token;
    var decodedtoken = jwt.verify(token,'lovevolleyball');
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
}
module.exports=exports=verify