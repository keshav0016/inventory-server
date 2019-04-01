

const models = require('../models/index.js')
const router = require('express').Router()
const passport = require('passport')
const cookie =require('cookie-parser')
// const sequelize = require('sequelize')


function logout(req,res,next){
    var receivedToken=req.cookies ? req.cookies.token : req.headers.token;
    models.users.findOne({ where : {user_id : req.currentUser.user_id}})
    .then(user => {
        if(user){
            user.token.forEach((singleToken, index) => {
                if(singleToken === receivedToken){
                    user.token.splice(index, 1);
                }
            });
            // sequelize.query(`UPDATE users SET token[${user.token.length} - 1] = null WHERE id = ${req.currentUser.user_id}`)
            return user.update({
                token : user.token
            })   
        }else{
            return models.Admin.findOne({ where : {email : req.currentUser.email}})
        }
    })
    .then(user => {
        if(user.role === 'Employee'){
            res.clearCookie('token')
            res.json({success:true})
        }else{
            user.token.forEach((singleToken, index) => {
                if(singleToken === receivedToken){
                    user.token.splice(index, 1);
                }
            });
            // sequelize.query(`UPDATE users SET token[${user.token.length} - 1] = null WHERE id = ${req.currentUser.user_id}`)
            return user.update({
                token : user.token
            })   
        }

    })
    .then(user => {
        res.clearCookie('token')
        res.json({success:true})
    })
    .catch(error => {
        res.json({
            error: error
        })
        console.log(error)
        next(error)
    })
}
router.post('/logout',logout)

module.exports = exports=router

