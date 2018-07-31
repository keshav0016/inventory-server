const models = require('../../models/index')
const router = require('express').Router()
const Sequelize = require('sequelize')

function listEmployee(req, res) {
    var page = Number(req.query.page) || 1
    var department = req.query.department || "%"
    var pagination = {}
    var nameSearch = req.query.search
    var idSearch = req.query.search

    models.users.count({where:Sequelize.and({role:'Employee'}, {department : {like : department}},Sequelize.or({user_id : {like : '%'+idSearch+'%'}},Sequelize.where(Sequelize.fn('CONCAT',Sequelize.col('first_name'),' ',Sequelize.col('last_name')),{ilike : '%'+nameSearch+'%'})))})
    .then(numberOfRecords => {
        pagination.totalPage = Math.ceil(numberOfRecords / 10);
        pagination.currentPage = page;
        // return models.users.scope('withoutPassword').findAll({where : {role:'Employee', department : {like : department},$or : []},order:[['createdAt','DESC']], limit: 10, offset: (page - 1) * 10})
        return models.users.scope('withoutPassword').findAll({where : Sequelize.and({role:'Employee'}, {department : {like : department}},Sequelize.or({user_id : {like : '%'+idSearch+'%'}},Sequelize.where(Sequelize.fn('CONCAT',Sequelize.col('first_name'),' ',Sequelize.col('last_name')),{ilike : '%'+nameSearch+'%'}))),order:[['createdAt','DESC'],['disable','ASC']], limit: 10, offset: (page - 1) * 10})
    })
    .then(user=> {
        res.json({user, message:'employees list is found', pagination});
    })
    .catch(error=>{
        res.json({
            error: error
        })
    })
}

router.get("/list", listEmployee)


module.exports = exports = router