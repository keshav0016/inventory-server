const models = require('../../models/index')
const router = require('express').Router()


function createVendorHandler(req, res, next){
    var newVendor = models.vendor.build({
        name : req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1).toLowerCase(),
        address : req.body.address,
        contact : req.body.contact
        
    })
    return newVendor.save()
    .then(vendor => {
        res.json({
            message: 'Vendor created'
        })
    })
    .catch(error => {
        if(error){
            console.log(error)
            if(error.errors[0]){
                res.json({
                    error : error.errors[0].message
                })
            }
            res.json({
                error : error.message
            })
        }
        else{
            res.json({
                error : 'vendor could not be added'
            })
        }
    })
}





router.post('/create', createVendorHandler)

module.exports = exports = router