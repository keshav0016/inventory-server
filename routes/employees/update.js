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







router.post("/update", update)

module.exports = exports = router;
