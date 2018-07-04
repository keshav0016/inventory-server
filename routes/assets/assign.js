const models = require('../../models/index')
const router = require('express').Router()
const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')

function assignAssetHandler(req, res, next){
    let maxLimit;
    return models.assets.findOne({where : {asset_id : req.body.asset_id}, include : [{model : models.type}]})
    .then(asset => {
        maxLimit = asset.type.maxRequest
        return models.assets_assigned.count({where : {user_id : req.body.user_id, to : null}, include : [{model : models.assets, where : {assetType : asset.assetType}}]})
    })
    .then(count => {
        if(count >= maxLimit && !req.body.assignForce){
            res.json({
                message : "This User already has this type of asset"
                ,requireAssignForce : true
            })
        }
        else{
            checkAssetName(req, res, next)
        }
    })
}


function checkAssetName(req, res, next){
    var assetName
    return models.assets.findOne({where : {asset_id : req.body.asset_id}})
    .then(asset => {
        asset.current_status = "Assigned"
        return asset.save()
    })
    .then(asset => {
        assetName = asset.asset_name;
        var newAssetAssign = models.assets_assigned.build({
            asset_id : asset.asset_id,
            user_id : req.body.user_id,
            from : req.body.from,
            expected_recovery : req.body.expected_recovery
        })        
        return newAssetAssign.save()
    })
    .then(assetAssign => {
        return models.users.findOne({where: {user_id: req.body.user_id}})
    })
    .then(user => {
        sgMail.setApiKey(api)
        const msg = {
            to : user.email,
            from : 'hr@westagilelabs.com'
            ,subject : 'Welcome to Wal Inventory management system'
        ,html : `<p>Hello ${user.first_name},<br />Welcome to the west agile labs' Inventory management system.<br /><br />You have been assigned the Asset, ${assetName} From ${req.body.from}  To ${req.body.expected_recovery}<br/></p>`
        }  
        return sgMail.send(msg)      
       
    })
    .then(() => {
        res.json({
            message : "Asset Assigned"
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "Asset could not be assigned"
        })
    })
}





router.post('/assign', assignAssetHandler)

module.exports = exports = router