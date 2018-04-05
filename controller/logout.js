

const models = require('../models/index.js')
const router = require('express').Router()
const passport = require('passport')
const cookie =require('cookie-parser')
// const sequelize = require('sequelize')


function logout(req,res,){
    console.log('logout')
    models.users.findOne({ where : {user_id : req.currentUser.user_id}})
    .then(user => {
        if(user){
            // sequelize.query(`UPDATE users SET token[${user.token.length} - 1] = null WHERE id = ${req.currentUser.user_id}`)
            user.token = null
            return user.save()   
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

