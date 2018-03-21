const express=require('express')
const app = express();
const cookieParser = require('cookie-parser')
const models = require('../models/index.js')
const jwt=require('jsonwebtoken')

app.use(cookieParser())

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