const models = require('../../models/index');
const router = require('express').Router();


function createAssetHandler(req, res, next){
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
        current_status : 'Available',
        category : req.body.category,
        condition : req.body.condition,
        location : req.body.location
    })
    .save()
    .then(asset => {
        res.json({
            message : 'Asset added successfully'
        })
    })
    .catch(error => {
        console.error(error)
        res.json({
            error : error.errors[0].message || 'Some error occurred'
        })
    })
}




router.post('/create', createAssetHandler);


module.exports = exports = router