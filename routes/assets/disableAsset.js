const models = require('../../models/index')
const router = require('express').Router()
const sequelize = models.sequelize;
function disableAssetHandler(req, res, next) {
    return sequelize.transaction((t) => {
        return models.assets.findOne({ where: { asset_id: req.body.asset_id } })
            .then(asset => {
                asset.disabled = 1;
                return asset.save({
                    transaction: t,
                })
            })
    })
        .then(asset => {
            res.json({
                message: 'Asset deleted successfully'
            })
        })
        .catch(error => {
            res.json({
                error: 'Some error occurred deleting the asset'
            })
        })
}





router.post('/disable', disableAssetHandler)

module.exports = exports = router