const models = require('../../models/index')
const router = require('express').Router()


function deleteAssetHandler(req, res, next){
    models.assets.destroy({ where : {asset_id : req.body.asset_id}})
    .then(assets => {
        if(assets === 0) {
            res.json({
                message : 'Asset can not be deleted',
                assets : assets
            })
        } else {
            res.json({
                message : 'Asset has been deleted'
            })
        }
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred deleting the asset'
        })
    })
}





router.post('/delete', deleteAssetHandler);


module.exports = exports = router;