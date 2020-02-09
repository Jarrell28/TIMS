const router = require("express").Router();
const db = require("../../models");

//Find All Equipments
router.get("/", function (req, res) {
    db.Equipment.findAll(
        {
            include: [
                { model: db.Category },
            ]
        })
        .then(function (dbEquipment) {
            res.json(dbEquipment);
        })
})

//Find Equipment By ID
router.get("/:id", function (req, res) {
    db.Equipment.findByPk(req.params.id,
        {
            include: [
                { model: db.Category },
            ]
        })
        .then(function (dbEquipment) {
            res.json(dbEquipment);
        })
})

//Create New Equipment
router.post("/", function (req, res) {
    db.Equipment.create(req.body)
        .then(function (dbEquipment) {
            res.json(dbEquipment);
        })
})

//Update Equipment
router.put("/:id", function (req, res) {
    db.Equipment.update(req.body, { where: { id: req.params.id } })
        .then(function (dbEquipment) {
            res.json(dbEquipment);
        })
})

//Delete Equipment
router.delete("/:id", function (req, res) {
    db.Equipment.destroy({ where: { id: req.params.id } })
        .then(function (dbEquipment) {
            res.json(dbEquipment);
        })
})

module.exports = router;