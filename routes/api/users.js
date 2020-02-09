const router = require("express").Router();
const db = require("../../models");

//Find User By ID
router.get("/:id", function (req, res) {
    db.User.findByPk(req.params.id).then(function (dbUser) {
        res.json(dbUser);
    })
})

//Create New User
router.post("/", function (req, res) {
    db.User.findOrCreate({ where: { email: req.body.email }, defaults: req.body })
        .then(function (dbUser) {
            res.json(dbUser);
        })
})

//Update User
router.put("/:id", function (req, res) {
    db.User.update(req.body, { where: { id: req.params.id } })
        .then(function (dbUser) {
            res.json(dbUser);
        })
})

//Delete User
router.delete("/:id", function (req, res) {
    db.User.destroy({ where: { id: req.params.id } })
        .then(function (dbUser) {
            res.json(dbUser);
        })
})

module.exports = router;