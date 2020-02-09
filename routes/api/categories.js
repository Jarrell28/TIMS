const router = require("express").Router();
const db = require("../../models");

//Find All Categories
router.get("/", function (req, res) {
    db.Category.findAll()
        .then(function (dbCategory) {
            res.json(dbCategory);
        })
})

//Find Category By ID
router.get("/:id", function (req, res) {
    db.Category.findByPk(req.params.id).then(function (dbCategory) {
        res.json(dbCategory);
    })
})

//Create New Category
router.post("/", function (req, res) {
    db.Category.create(req.body)
        .then(function (dbCategory) {
            res.json(dbCategory);
        })
})

//Update Category
router.put("/:id", function (req, res) {
    db.Category.update(req.body, { where: { id: req.params.id } })
        .then(function (dbCategory) {
            res.json(dbCategory);
        })
})

//Delete Category
router.delete("/:id", function (req, res) {
    db.Category.destroy({ where: { id: req.params.id } })
        .then(function (dbCategory) {
            res.json(dbCategory);
        })
})

module.exports = router;