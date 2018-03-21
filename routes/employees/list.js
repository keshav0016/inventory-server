function list(req, res) {
    console.log('got near driver list')
    models.users.findAll({where:{role:'employee'}}).then(function (user) {
        res.json(user);
    })
}
router.get("/list", list)
modules.exports = exports = router