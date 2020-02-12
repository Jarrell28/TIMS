const router = require("express").Router();
const db = require("../../models");

//Find All Loaners
router.get("/", function (req, res) {
    db.Loaner.findAll(
        {
            include: [
                { model: db.User, as: "tech" },
            ]
        })
        .then(function (dbLoaner) {
            res.json(dbLoaner);
        })
})

//Find Loaner By ID
router.get("/:id", function (req, res) {
    db.Loaner.findByPk(req.params.id,
        {
            include: [
                { model: db.User, as: "tech" },
            ]
        })
        .then(function (dbLoaner) {
            res.json(dbLoaner);
        })
})

//Create New Loaner
router.post("/", function (req, res) {
    db.Loaner.create(req.body)
        .then(function (dbLoaner) {
            res.json(dbLoaner);
        })
})

//Update Loaner
router.put("/:id", function (req, res) {
    db.Loaner.update(req.body, { where: { id: req.params.id } })
        .then(function (dbLoaner) {
            res.json(dbLoaner);
        })
})

//Delete Loaner
router.delete("/:id", function (req, res) {
    db.Loaner.destroy({ where: { id: req.params.id } })
        .then(function (dbLoaner) {
            res.json(dbLoaner);
        })
})

module.exports = router;