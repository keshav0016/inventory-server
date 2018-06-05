const models = require('../../models/index')
const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')

sgMail.setApiKey(api);

function acceptAssetTicketHandler(req, res){
    var user;
    var assetName;
    var reason = req.body.reason;
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
        assetName = asset.asset_name;
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
        return models.users.findOne({ where : {user_id : user}})
    })
    .then(users => {
        const msg = {
            to : users.email,
            from : 'hr@westagilelabs.com'
            ,subject : `Asset ${assetName} ticket request accepted`
        ,html : `<p>Hello ${users.first_name},<br /><br />The ${assetName} asset request has been accepted<br /><br />Remarks : ${reason}</p>`
        }  
        return sgMail.send(msg)
    })
    .then(()=> {
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