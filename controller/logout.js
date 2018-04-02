

const models = require('../models/index.js')
const router = require('express').Router()
const passport = require('passport')
const cookie =require('cookie-parser')


function logout(req,res,){
    console.log('logout')
    res.clearCookie('token')
    res.json({success:true})
  

}
router.post('/logout',logout)

module.exports = exports=router

