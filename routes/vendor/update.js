const models = require('../../models/index')
const router = require('express').Router()


function updateVendorHandler(req, res, next){
    let saveAllUserPromise = []
    var prevVendor;
    models.vendor.findOne({where : {id : req.body.id}})
    .then(vendor => {
        prevVendor = vendor.name
        return models.assets.findAll({where: {vendor: prevVendor}})
        
    })
    .then(asset => {
        asset.forEach(e => {
            e.vendor = req.body.name
            saveAllUserPromise.push(e.save())
        })
        return Promise.resolve(asset)
     
    })
    .then(asset => {
        return models.consumables_purchased.findAll({where: {vendor_name : prevVendor}})
    })
    .then(consumable => {
        consumable.forEach(e => {
            e.vendor_name = req.body.name
            saveAllUserPromise.push(e.save())
        })
        return Promise.resolve(consumable)
    })
    .then(consumable => {
        return models.assets_repair.findAll({where: {vendor : prevVendor}})
    })
    .then(assetRepair => {
        assetRepair.forEach(e => {
            e.vendor = req.body.name
            saveAllUserPromise.push(e.save())

        })
        return Promise.resolve(assetRepair)
    })
    .then(assetRepair => {
        return models.vendor.findOne({where: {id: req.body.id}})
    })
    .then(vendor => {
        vendor.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1).toLowerCase(),
        vendor.address = req.body.address
        vendor.contact = req.body.contact
        vendor.landline = req.body.landline
        saveAllUserPromise.push(vendor.save())

        return Promise.resolve(vendor)
        
    })
    .then(vendor => {
        return Promise.all(saveAllUserPromise)
       
    })
    .then(() => {
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