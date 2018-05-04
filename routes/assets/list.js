const models = require('../../models/index')
const router = require('express').Router()
const Sequelize = require('sequelize')


function listAssetHandler(req, res, next){
   var page = Number(req.query.page) || 1
   var Asearch = req.query.search 
   var searchFilter = []
   var pagination = {}
   var searchAssetId = Number(req.query.searchAsset)
   var searchCategoryFilter = []

   for(var key in req.query){
       if(req.query[key] === "true" && ((key === 'Available') || (key === 'Assigned') || (key === 'Service'))){
           searchFilter.push(key)
       }
   }

   for(var key in req.query){
       if(req.query[key] === "true" && ((key === 'Electronics') || (key === 'Non-Electronics') || (key === 'Other'))){
           searchCategoryFilter.push(key)
       }
   }

   if(searchFilter.length === 0){
       searchFilter = ['Available', 'Assigned', 'Service']
   }

   if(searchCategoryFilter.length === 0){
       searchCategoryFilter = ['Electronics', 'Non-Electronics', 'Other']
   }

   models.assets.count()
   .then(numberOfRecords => {
       if(!searchAssetId){
           pagination.totalPage = Math.ceil(numberOfRecords / 10);
           pagination.currentPage = page;
           return models.assets.findAll({ where : Sequelize.and({current_status : {in : searchFilter}}, {category : {in : searchCategoryFilter}}, Sequelize.or({asset_name : {like : "%"+Asearch+"%"}})), order : [['createdAt','DESC']], limit: 10, offset: (page - 1) * 10})
       }
       else{
           pagination.totalPage = 1
           pagination.currentPage = 1;
           return models.assets.findAll({ where :{asset_id : searchAssetId}})    
        }
    })
   .then(assets => {
       res.json({
           assets : assets,
           pagination : pagination
       })
   })
   .catch(error => {
       res.json({
           assets : `No assets`
       })
   })
}




router.get('/list', listAssetHandler)


module.exports = exports = router