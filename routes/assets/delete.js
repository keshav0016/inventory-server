const models = require('../../models/index')
const router = require('express').Router()


function deleteAssetHandler(req, res, next){
    models.assets.destroy({ where : {asset_id : req.body.asset_id}})
    .then(assets => {
        res.json({
            message : 'Asset deleted successfully'
        })
    })
    .catch(error => {
        res.json({
            error : 'Some error occurred deleting the asset'
        })
    })
}





router.post('/delete', deleteAssetHandler);


module.exports = exports = router;