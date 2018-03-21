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
router.post("/delete", del)
modules.exports = exports = router