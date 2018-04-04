const models = require('../../models/index')
const router = require('express').Router()


function repairInfoHandler(req,res,next){
    models.assets_repair.findOne({ where: {asset_id : req.query.asset_id, to : null}})
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