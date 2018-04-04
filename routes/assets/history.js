const models = require('../../models/index')
const router = require('express').Router()



function assetHistoryHandler(req, res, next){
    var historyAssigned = []
    var historyRepair = []
    var assetDetails = {}
    var employeeDetails = {}
    models.assets.findOne({where : {asset_id : req.query.asset_id}})
    .then(asset => {
        assetDetails = asset
        return models.assets_assigned.findAll({ where : {asset_id : req.query.asset_id}})
    })
    .then(assetAssign => {
        historyAssigned.push(...assetAssign)
    //     return models.assets_assigned.findOne({where : {asset_id : req.query.asset_id, to : null}})
    // })
    // .then(assetAssigned => {
    //     return models.users.findOne({where : {user_id : assetAssigned.user_id}})
    // })
    // .then(user => {
    //     employeeDetails = user
        return models.assets_repair.findAll({ where : {asset_id : req.query.asset_id}})
    })
    .then(assetRepair => {
        historyRepair.push(...assetRepair)
        // historyRepair.sort(function(a, b){return b.updatedAt - a.updatedAt})
        res.json({
            historyAssigned : historyAssigned, assetDetails : assetDetails, historyRepair : historyRepair, employeeDetails : employeeDetails
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "History could not be displayed"
        })
    })
}





router.get('/history', assetHistoryHandler)


module.exports = exports = router