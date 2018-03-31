const models = require('../../models/index')
const router = require('express').Router()
const argon2 = require('argon2')
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
    .then(users=>{
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