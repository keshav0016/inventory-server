const models = require('../../models/index')
const router = require('express').Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
function EmployeePasswordChange(req,res){
    var hashedPassword
    return  argon2.hash(req.body.password)
    .then((hash) => {
        hashedPassword =hash
        return models.users.findOne({
            where: {user_id: req.body.user_id}
        })
    })
    .then((users) => {
        users.password = hashedPassword;
        return users.save()
    })
    .then(user=>{
        user.token=[jwt.sign({ user_id : user.user_id},'lovevolleyball')]
        // res.json({message:'no need to change'})
        return user.save()       
        
    })     
    .then(user => {
        res.json({
            message: 'password has been changed',
            
        })
    }) 
    .catch(error=>{
        console.log(error)
    })
   
}

router.post('/changepassword',EmployeePasswordChange)
module.exports = exports = router