const models = require('../../models/index')
const router = require('express').Router()


function updateVendorHandler(req, res, next){
    models.vendor.findOne({where : {id : req.body.id}})
    .then(vendor => {
        vendor.name = req.body.name,
        vendor.address = req.body.address
        vendor.contact = req.body.contact
        return vendor.save()
    })
    .then(vendor => {
        res.json({
            message: 'vendor has been updated'
        })
    })
    .catch(error => {
        if(error){
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
                error : 'vendor can not be updated'
            })
        }
    })
}





router.post('/update', updateVendorHandler)

module.exports = exports = router