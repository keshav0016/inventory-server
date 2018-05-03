const models = require('../../models/index')
const router = require('express').Router()

function listEmployee(req, res) {
    var page = Number(req.query.page) || 1
    var department = req.query.department || "%"
    var pagination = {}

    models.users.count({where:{role:'Employee', department : {like : department}}})
    .then(numberOfRecords => {
        pagination.totalPage = Math.ceil(numberOfRecords / 10);
        pagination.currentPage = page;
        return models.users.findAll({where:{role:'Employee', department : {like : department}}, limit: 10, offset: (page - 1) * 10})
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