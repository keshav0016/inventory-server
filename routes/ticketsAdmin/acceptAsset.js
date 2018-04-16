const models = require('../../models/index')

function acceptAssetTicketHandler(req, res){
    var user;
    var assetId
    var assetName
    models.ticket.findOne({ where: {ticket_number : req.body.ticket_number}})
    .then(ticket => {
        assetName = ticket.requested_asset_item
        return models.assets.findOne({ where : {asset_id : ticket.requested_asset_id, current_status : 'Available'}})
    })
    .then(asset => {
        if(!asset){
            return models.assets.findOne({where : {asset_name : assetName, current_status : 'Available'}})
        }
        else{
            return Promise.resolve(asset)
        }
    })
    .then(asset => {
        if(asset){
            asset.current_status = "Assigned"
            assetId = asset.asset_id
            return asset.save()
        }
        else{
            res.json({
                message : 'No Asset Available'
            })
        }
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
        return models.ticket.findOne({ where: {ticket_number : req.body.ticket_number}})
    })
    .then(ticket => {
        ticket.status = 'Accepted'
        ticket.reason = req.body.reason
        ticket.requested_asset_id = assetId
        user = ticket.user_id
        return ticket.save()
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