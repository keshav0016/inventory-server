const models = require('../../models/index')
const router = require('express').Router()
const sequelize = models.sequelize;

function createVendorHandler(req, res, next) {
    let message = '';
    return sequelize.transaction((t) => {
        return models.vendor.findOne({ where: { name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1).toLowerCase() } })
            .then(vendor => {
                if (vendor) {
                    // res.json({
                    //     message : 'Vendor is already there.'
                    // })
                    message = 'Vendor is already there.';
                }
                else {
                    var newVendor = models.vendor.build({
                        name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1).toLowerCase(),
                        address: req.body.address,
                        contact: req.body.contact,
                        landline: req.body.landline,

                    })
                    return newVendor.save()
                        .then(vendor => {
                            // res.json({
                            //     message: 'Vendor created'
                            // })
                            message = 'Vendor created';
                        })
                }
            })
    })
        .then(() => {
            res.json({
                message,
            })
        })
        .catch(error => {
            if (error) {
                console.log(error)
                if (error.errors[0]) {
                    res.json({
                        error: error.errors[0].message
                    })
                }
                res.json({
                    error: error.message
                })
            }
            else {
                res.json({
                    error: 'vendor could not be added'
                })
            }
        })

}





router.post('/create', createVendorHandler)

module.exports = exports = router