const models = require('../../models/index')
const router = require('express').Router()
const sequelize = models.sequelize;

function recoverAssetFromRepairHandler(req, res, next) {
    return sequelize.transaction((t) => {
       return models.assets_repair.findOne({ where: { asset_id: req.body.asset_id, to: null } })
            .then(assetRepair => {
                assetRepair.to = req.body.to,
                    assetRepair.repair_invoice = req.body.repair_invoice,
                    assetRepair.amount = req.body.amount,
                    assetRepair.gst = req.body.gst,
                    assetRepair.total = req.body.total
                return assetRepair.save({
                    transaction: t,
                })
            })
            .then(assetRepair => {
                return models.assets.findOne({ where: { asset_id: req.body.asset_id } })
            })
            .then(asset => {
                asset.current_status = "Available"
                asset.condition = 'Repaired'
                return asset.save({
                    transaction: t,
                })
            })
    })
        .then(asset => {
            res.json({
                message: "Asset recovered from service"
            })
        })
        .catch(error => {
            res.json({
                error: error.message || "Asset's repair info could not be stored"
            })
        })
}






router.post('/recover-repair', recoverAssetFromRepairHandler)

module.exports = exports = router