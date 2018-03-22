const models = require('../../models/index');
const router = require('express').Router();


function updateAssetHandler(req, res, next){
    const newAsset = models.assets.build({
        serial_number : req.body.serial_number,
        asset_name : req.body.asset_name.charAt(0).toUpperCase() + req.body.asset_name.slice(1).toLowerCase(),
        purchase_date : req.body.purchase_date,
        description : req.body.description,
        invoice_number : req.body.invoice_number,
        vendor : req.body.vendor,
        amount : req.body.amount,
        gst : req.body.gst,
        total : req.body.total,
        current_status : req.body.current_status,
        category : req.body.category.charAt(0).toUpperCase() + req.body.category.slice(1).toLowerCase()
    })
    .save()
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