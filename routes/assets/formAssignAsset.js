const models = require('../../models/index');
const router = require('express').Router();


function formAssignAssetHandler(req, res, next){
    var allEmployees = []
    models.users.findAll({ where : {role : 'Employee' ,disable: 0}, attributes : ['user_id', 'first_name','last_name', 'department'],order:[['first_name','ASC']]})
    .then(employees => {
        allEmployees.push(...employees);
        return models.assets.findAll({ where : {current_status : 'Available'}, attributes : ['asset_name', 'category'], group : ['asset_name', 'category'] })
    })
    .then(assets => {
        res.json({
            employees : allEmployees,
            assets : assets
        })
    })
    .catch(error => {
        res.json({
            error : 'Could not get the details of the employees and assets'
        })
    })
}



router.get('/assign-form', formAssignAssetHandler)


module.exports = exports = router