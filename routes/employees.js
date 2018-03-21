const models = require('../models/index.js')
const router = require('express').Router()
const tokenauth = require('../middleware/tokenauth')


function create(req, res) {
    console.log('got near create')
    models.users.create({
        user_id:req.body.user_id,
        password:req.body.password,
        role:req.body.role,
        department:req.body.department

    }).then(function (user) {
        res.json(user);
    })
}

function list(req, res) {
    console.log('got near driver list')
    models.users.findAll({where:{role:'employee'}}).then(function (user) {
        res.json(user);
    })
}

function del(req, res) {
    console.log('got near delete')
    models.users.destroy({
        where: {
            user_id: req.body.user_id
        }
    }).then(function (user) {
        res.json(user);
    });
}


function update(req, res) {
    console.log('got near update')
    models.users.findOne({
        where: {
            user_id: req.body.user_id
        }
    })
    .then(function (user) {
        if (user) {
            users.updateAttributes({
               department:req.body.department,
               password:req.body.password,
               role:req.body.role
                
            }).then(function (user) {
                res.json(user);
            });
        }
    });
}



//router.use(tokenauth)
router.post("/create", create)

router.post("/delete", del)

router.get("/list", list)

router.post("/update", update)

module.exports = exports = router;
