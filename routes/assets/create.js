const models = require('../../models/index');
const router = require('express').Router();


function createAssetHandler(req, res, next){
    models.assets.findOne({where :{asset_name : req.body.asset_name.charAt(0).toUpperCase() + req.body.asset_name.slice(1),
    }})
    .then(asset => {
        // if(asset){
        //     res.json({
        //         message: 'asset is already there'
        //     })
        // }else{
            models.assets.create({
                serial_number : req.body.serial_number,
                asset_name : req.body.asset_name.charAt(0).toUpperCase() + req.body.asset_name.slice(1),
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
                ,assetType : req.body.assetType.charAt(0).toUpperCase() + req.body.assetType.slice(1)
                ,disabled : 0
            })
            .then(asset => {
                res.json({
                    message : 'Asset added successfully'
                })
            })
            .catch(SequelizeValidationError=>{
                console.log(SequelizeValidationError)
                res.json({
                    errors: SequelizeValidationError.errors
                })
            })
        // }
    })
    .catch(error => {
        console.error(error)
        res.json({
            error : error || 'Some error occurred'
        })
    })
}




router.post('/create', createAssetHandler);


module.exports = exports = router