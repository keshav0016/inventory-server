const models = require('../../models/index')
const router = require('express').Router()


function availableAssetsHandler(req, res, next){
    models.ticket.findOne({where : {ticket_number : req.query.ticket.ticket_number}})
    .then(ticket => {
        if(ticket && ticket.status === 'Pending'){
            return models.assets.findAll({where : {current_status : 'Available', assetType : ticket.requested_asset_item, disabled : {$notIn : [1]}}})
        }
        else{
            return Promise.reject('Ticket is not in Pending state')
        }
    })
    .then(assets => {
        res.json({
            assets : assets
        })
    })
    .catch(error => {
        res.json({
            error : error
        })
    })
}





router.get('/available', availableAssetsHandler)

module.exports = exports = router