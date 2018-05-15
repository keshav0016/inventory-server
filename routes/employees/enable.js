const models = require('../../models/index')
const router = require('express').Router()

function enableEmployeeHandler(req, res, next){
    models.users.findOne({ where : {user_id : req.body.user_id}})
    .then(user => {
        user.disable = 0;
        return user.save()
    })
    .then(user => {
        res.json({
            message : 'Employee ennabled successfully'
        })
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred enabling the Employee'
        })
    })
}





router.post('/enable', enableEmployeeHandler)

module.exports = exports = router