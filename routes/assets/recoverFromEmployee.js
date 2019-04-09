const models = require('../../models/index')
const router = require('express').Router()
const sgMail = require('@sendgrid/mail');
const api = require('../../config/sendGrid')
const sequelize = models.sequelize;

function recoverAssetHandler(req, res, next) {
    var user_id
    var assetName
    var assetType
    return sequelize.transaction((t) => {
        return models.assets.findOne({ where: { asset_id: req.body.asset_id } })
            .then(asset => {
                assetName = asset.asset_name
                assetType = asset.assetType
                asset.current_status = "Available"
                asset.condition = 'Used'
                return asset.save({
                    transaction: t,
                })
            })
            .then(asset => {
                return models.assets_assigned.findOne({ where: { asset_id: req.body.asset_id, to: null } })
            })
            .then(assetAssigned => {
                user_id = assetAssigned.user_id
                assetAssigned.to = req.body.to
                return assetAssigned.save({
                    transaction: t,
                })
            })
            .then(assetAssigned => {
                return models.users.findOne({
                    where: {
                        user_id: user_id
                    }
                })
            })
            .then(user => {
                sgMail.setApiKey(api)
                const msg = {
                    to: user.email,
                    from: 'hr@westagilelabs.com'
                    , subject: 'An Asset Recovered from you'
                    , html: `<p>Hello ${user.first_name},<br/><br/>An Asset called <b>${assetName}</b> ${assetType} has been recovered from you. For further queries feel free to reach admin department.<br /><br />Thanks,<br />Team Admin</p>`
                }
                return sgMail.send(msg)

            })
    })
        .then(() => {
            res.json({
                message: "Asset recovered"
            })
        })
        .catch(error => {
            res.json({
                error: error.message || "Asset could not be recovered"
            })
        })
}




router.post('/recover', recoverAssetHandler)

module.exports = exports = router