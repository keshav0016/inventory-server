const models = require('../../models/index')
const router = require('express').Router()



function acceptAssetTicketHandler(req, res, next){
    var user;
    models.ticket.findOne({ where: {ticket_number : req.body.ticket_number}})
    .then(ticket => {
        ticket.status = 'Accepted'
        user = ticket.user_id
        return ticket.save()
    })
    .then(ticket => {
        return models.assets.findOne({ where : {asset_id : ticket.requested_asset_id}})
    })
    .then(asset => {
        asset.current_status = "Assigned"
        return asset.save()
    })
    .then(asset => {
        var newAssetAssigned = models.assets_assigned.build({
            asset_id : asset.asset_id,
            user_id : user,
            ticket_number : req.body.ticket_number,
            from : Date.now(),
            expected_recovery : req.body.expected_recovery
        })
        return newAssetAssigned.save()
    })
    .then(assetAssigned => {
        res.json({
            message : "Ticket Accepted"
        })
    })
    .catch(error => {
        res.json({
            error : error.message
        })
    })
}







router.post('/accept', acceptAssetTicketHandler)

module.exports = exports = router