const express=require('express')
const app = express();
const models = require('../models/index.js')
const jwt= require('jsonwebtoken')


function tokenMiddleware(req, res, next) {
    const webApi = req.cookies && req.cookies.token
    var receivedToken= webApi ? req.cookies.token : req.headers.token;
    if(receivedToken){
        var decodedtoken = jwt.verify(receivedToken,'lovevolleyball');
        models.users.scope('withoutPassword').findOne({ where : {user_id:decodedtoken.user_id,token :{$contains : [receivedToken]}  }})
        .then(user=>{
            if(user){
                req.currentUser = user;
                if (webApi) {
                    res.clearCookie('passwordChange')
                    res.cookie('token', receivedToken, {encode : String, maxAge : 1000 * 60 * 15});
                } else {
                    res.set('token', receivedToken)
                }
                next()
            }else{
                res.status(403).send('Employee not found' )
            }
        })
        .catch(error=>{
            next(error)
        })
    }
    else {
        if (webApi) {
            res.clearCookie('passwordChange')        
        }
        res.status(401).send('No token found')
    }
}
module.exports=exports=tokenMiddleware