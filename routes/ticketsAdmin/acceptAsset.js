const models = require('../../models/index')

function acceptAssetTicketHandler(req, res){
    var user;
    models.ticket.findOne({ where: {ticket_number : req.body.ticket_number, status : 'Pending'}})
    .then(ticket => {
        ticket.status = 'Accepted'
        ticket.reason = req.body.reason
        ticket.requested_asset_id = req.body.requested_asset_id
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


module.exports = exports = acceptAssetTicketHandler