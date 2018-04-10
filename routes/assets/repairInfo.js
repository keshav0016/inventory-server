const models = require('../../models/index')
const router = require('express').Router()


function repairInfoHandler(req,res,next){
    models.assets_repair.findOne({ where: {asset_id : req.query.asset_id, to : null}, include : [{model : models.assets, where : {asset_id : req.query.asset_id}}]})
    .then(repairRecord => {
        res.json({
            repairInfo : repairRecord
        })
    })
    .catch(error => {
        res.json({
            error : error
        })
    })
}




router.get('/repair-info', repairInfoHandler)

module.exports = exports = router