const models = require('../../models/index')
const router = require('express').Router()

function disableEmployeeHandler(req, res, next){
    models.users.findOne({include: [{model : models.assets_assigned}], where : {user_id : req.body.user_id}})
    .then(user => {
        user.assets_assigneds.forEach(assets_assigned => {
            if(assets_assigned.to === null){
                res.json({
                    message: 'recover the assets first'
                })
            }else{
                user.disable = 1;
                return user.save()
            }
        });
        // user.disable = 1;
        // return user.save()
    })
    .then(user => {
        res.json({
            message : 'Employee disabled successfully'
        })
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred deleting the Employee'
        })
    })
}





router.post('/disable', disableEmployeeHandler)

module.exports = exports = router