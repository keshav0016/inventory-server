const models = require('../../models/index');
const router = require('express').Router();


function updateAssetHandler(req, res, next){
    models.assets.findOne({ where : {asset_id : req.body.asset_id}})
    .then(asset => {
        asset.serial_number = req.body.serial_number
        asset.asset_name = req.body.asset_name.charAt(0).toUpperCase() + req.body.asset_name.slice(1).toLowerCase()
        asset.purchase_date = req.body.purchase_date
        asset.description = req.body.description
        asset.invoice_number = req.body.invoice_number
        asset.vendor = req.body.vendor
        asset.amount = req.body.amount
        asset.gst = req.body.gst
        asset.total = req.body.total
        // asset.current_status = req.body.current_status
        asset.category = req.body.category.charAt(0).toUpperCase() + req.body.category.slice(1).toLowerCase()
    
        return asset.save()
    })
    .then(asset => {
        res.json({
            message : 'Asset updated successfully'
        })
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred'
        })
    })
}





router.post('/update', updateAssetHandler)
module.exports = exports = router