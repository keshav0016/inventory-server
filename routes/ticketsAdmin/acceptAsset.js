const models = require('../../models/index')
const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')

sgMail.setApiKey(api);


function acceptAssetTicketHandler(req, res){
    let admin;
    var user;
    var assetName;
    var reason = req.body.reason;
    let assetId;
    models.users.findOne({where : {email: req.currentUser.email}, attributes: ['first_name','last_name']})
    .then(users => {
        if(users.first_name && users.last_name){
            admin = users.first_name + " " +users.last_name
        }else{
            admin = "Admin"
        }
        return  models.assets.findOne({where: {asset_name: decodeURIComponent(req.body.asset), current_status: 'Available'}})

    })
    .then(asset => {
        assetId = asset.asset_id
        return models.ticket.findOne({ where: {ticket_number : req.body.ticket_number, status : 'Pending'}})
    
    })
    .then(ticket => {
        ticket.status = 'Accepted'
        ticket.reason = req.body.reason
        ticket.requested_asset_id = req.body.requested_asset_id
        ticket.adminName = admin
        user = ticket.user_id
    
        return ticket.save()
    })
    .then(ticket => {
        return models.assets.findOne({ where : {asset_name : ticket.asset_name, current_status: 'Available'}})
    })
    .then(asset => {
        assetName = asset.asset_name;
        asset.current_status = "Assigned"
        return asset.save()
    })
    .then(asset => {
        var newAssetAssigned = models.assets_assigned.build({
            asset_id : req.body.requested_asset_id,
            user_id : user,
            ticket_number : req.body.ticket_number,
            from : Date.now(),
            expected_recovery : req.body.expected_recovery,
            adminName : admin
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
        ,html : `<p>Hello ${users.first_name},<br /><br />The ${assetName} asset request has been accepted<br /><br />Remarks : ${reason}<br /><br />Thanks,<br />Team Admin</p>`
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