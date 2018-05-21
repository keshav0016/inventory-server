const models = require('../../models/index')
const router = require('express').Router()


function listEmployees(req,res){
    var employeeList = [];
    models.users.findAll({
        where:{role: 'Employee',attribute:['user_id','first_name','last_name'],disable:0},
    })
    .then(employees=>{
        employees.forEach((employee, index) => {
            employeeList.push(employee)
        })
        res.json({
            employeeList
        })
    })
}

router.get('/listEmployee',listEmployees)
module.exports = exports = router 