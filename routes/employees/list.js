const models = require('../../models/index')
const router = require('express').Router()

function listEmployee(req, res) {
    var page = req.query.page || 1
    var department = req.query.department || "%"
    var pagination = {}

    models.users.count({where:{role:'Employee', department : {like : department}}})
    .then(numberOfRecords => {
        pagination.totalPage = Math.ceil(numberOfRecords / 2);
        pagination.currentPage = page;
        return models.users.findAll({where:{role:'Employee', department : {like : department}}, limit: 2, offset: (page - 1) * 2})
    })
    .then(user=> {
        res.json({user, message:'employees list is found', pagination});
    })
    .catch(error=>{
        console.log(error)
        res.json({
            error: error
        })
    })
}

router.get("/list", listEmployee)


module.exports = exports = router