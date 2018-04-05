const models = require('../../models/index')
const router = require('express').Router()

var consumablePendingCount;
var consumableAcceptedCount;
var lowConsumable;
var assetPendingCount;
var assetAcceptedCount;


function dashBoardCount(req, res, next){
    models.ticket.count({ where: {item_type : 'consumables', status : 'Pending'}})
    .then(pending => {
        consumablePendingCount = pending;
        return models.ticket.count({where: {item_type : 'consumables', status : 'Accepted'}})
    })
    .then(accepted => {
        consumableAcceptedCount = accepted;
        return models.consumables.count({where: {quantity:{lt:10}}})
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
        res.json({
            pendingConsumable : consumablePendingCount,
            acceptedConsumable : consumableAcceptedCount,
            lowConsumable : lowConsumable,
            pendingAsset : assetPendingCount,
            acceptedAsset : assetAcceptedCount
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