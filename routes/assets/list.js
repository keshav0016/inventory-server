const models = require('../../models/index')
const router = require('express').Router()
const Sequelize = require('sequelize')
const sequelize = models.sequelize;

function listAssetHandler(req, res, next){
   var page = Number(req.query.page) || 1
   var Asearch = req.query.search
   var serialSearch = Number(req.query.search)
   var searchFilter = []
   var pagination = {}
   var searchAssetId = Number(req.query.searchAsset)
   var searchCategoryFilter = []
    let numberSearch = Number(req.query.search) || Number.MAX_SAFE_INTEGER

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

   models.assets.count({ where : Sequelize.and({current_status : {in : searchFilter}}, {category : {in : searchCategoryFilter}}, Sequelize.or({asset_name : {ilike : "%"+Asearch+"%"}}, {asset_id : {$gte : numberSearch * 10} }, {asset_id : numberSearch}, {serial_number : {ilike : '%'+Asearch+'%'}}))})
   .then(numberOfRecords => {
       if(!searchAssetId){
           pagination.totalPage = Math.ceil(numberOfRecords / 10);
           pagination.currentPage = page;
           return models.assets.findAll({include: [{model : models.assets_assigned }], where : Sequelize.and({current_status : {in : searchFilter}}, {category : {in : searchCategoryFilter}}, Sequelize.or({asset_name : {ilike : "%"+Asearch+"%"}}, {asset_id : {$gte : numberSearch * 10}}, {asset_id : numberSearch}, {serial_number : {ilike : '%'+Asearch+'%'}} )), order : [['createdAt','DESC']], limit: 10, offset: (page - 1) * 10})
       }
    //    else{
    //        pagination.totalPage = 1
    //        pagination.currentPage = 1;
    //        return models.assets.findAll({ where : Sequelize.and({current_status : {in : searchFilter}}, {category : {in : searchCategoryFilter}}, Sequelize.or({asset_id : searchAssetId})), order : [['createdAt','DESC']], limit: 10, offset: (page - 1) * 10})
    //     }
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