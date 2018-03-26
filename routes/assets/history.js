const models = require('../../models/index')
const router = require('express').Router()



function assetHistoryHandler(req, res, next){
    var history = []
    models.assets_assigned.findAll({ where : {asset_id : req.body.asset_id}})
    .then(assetAssign => {
        history.push(...assetAssign)
        return models.assets_repair.findAll({ where : {asset_id : req.body.asset_id}})
    })
    .then(assetRepair => {
        history.push(...assetRepair)
        history.sort(function(a, b){return b.updatedAt - a.updatedAt})
        res.json({
            history : history
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "History could not be displayed"
        })
    })
}





router.post('/history', assetHistoryHandler)


module.exports = exports = router