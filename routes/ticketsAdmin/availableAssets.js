const models = require('../../models/index')
const router = require('express').Router()


function availableAssetsHandler(req, res, next){
    models.ticket.findOne({where : {ticket_number : Number(req.query.ticket)}})
    .then(ticket => {
        if(ticket && ticket.status === 'Pending'){
            return models.assets.findAll({where : {current_status : 'Available', assetType : ticket.requested_asset_item,asset_name : ticket.asset_name, disabled : {$notIn : [1]}}})
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