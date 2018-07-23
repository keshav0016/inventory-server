const models = require('../../models/index')
const router = require('express').Router()


var consumablePendingCount;
var consumableAcceptedCount;
var lowConsumable;
var assetPendingCount;
var assetAcceptedCount;
var repairDateNear;


function dashBoardCount(req, res, next){
    var assetsPendingArray = [];
    models.ticket.count({ where: {item_type : 'consumables', status : 'Pending'}})
    .then(pending => {
        consumablePendingCount = pending;
        return models.ticket.count({where: {item_type : 'consumables', status : 'Accepted'}})
    })
    .then(accepted => {
        consumableAcceptedCount = accepted;
        return models.consumables.findAll({attributes : ["name", "quantity"], where: {quantity:{lt:10}, name : { $in : ['Pens' , 'Pencils', 'Id holder', 'Stick note']}}, })
    })
    .then(low =>{
        lowConsumable = low;
        return models.ticket.count({ where: {item_type : 'assets', status : 'Pending'}})
    })
    .then(apending => {
        assetPendingCount = apending;
        return models.ticket.count({where: {item_type : 'assets', status : 'Accepted'}})
    })
    .then(acceptedA => {
        assetAcceptedCount = acceptedA;
        let limitDate = new Date(Number(new Date()) + (24*60*60*1000))
        return models.assets_repair.findAll({where : {to : null, expected_delivery : { lt : limitDate}}, attributes : ['asset_id', 'expected_delivery', 'vendor'], include :[{model : models.assets, attributes : ['asset_name', 'assetType', 'serial_number']}]})
    })
    .then(repairAssets => {
        repairDateNear = repairAssets
        return models.ticket.findAll({where: {item_type : 'assets', status : 'Pending'}, include : [{model : models.users}]})
    })
    .then(assetsPending => {
        assetsPending.forEach(element => {
            if(element.user.disable === 0){
                assetsPendingArray.push(element)
            }
        });
        res.json({
            pendingConsumable : consumablePendingCount,
            acceptedConsumable : consumableAcceptedCount,
            lowConsumable : lowConsumable,
            pendingAsset : assetsPendingArray.length,
            acceptedAsset : assetAcceptedCount,
            repairDateNear : repairDateNear
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "Ticket could not be rejected"
        })
    })
}






router.get('/dashboard', dashBoardCount)

module.exports = exports = router