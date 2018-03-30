const models = require('../../models/index')
const router = require('express').Router()


function listVendorHandler(req, res, next){
    var page = req.body.page || 1
    var pagination = {}  
    var vendorList = []
    var limitVendors = 0

    if(req.body.page){
        limitVendors = 10
    }
    else{
        limitVendors = 100
    }

    models.vendor.findAll({ limit: 10, offset: (page - 1) * 10, order : [['id', 'ASC']] })
    .then(vendorListing => {
        
        if(vendorListing){
            vendorList.push(...vendorListing);
            return models.vendor.count()
        }
        
        else{
            res.json({
                message : 'vendors not found'
            })
        }
    })
    .then(numberOfRecords => {
        pagination.totalPage = Math.ceil(numberOfRecords / 10);
        pagination.currentPage = page;
        res.json({
            vendors: vendorList,
            pagination: pagination
        })
    })
    .catch(error => {
        res.json({
            error : error.message || "Tickets could not be listed"
        })
    })
}



router.get('/list', listVendorHandler)

module.exports = exports = router