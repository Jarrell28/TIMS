const router = require("express").Router();
const db = require("../../models");

//Find All Requests
router.get("/", function (req, res) {
    db.Request.findAll(
        {
            include: [
                { model: db.User, as: "userRequest" },
                { model: db.User, as: "userApprove" },
                { model: db.Equipment },
                { model: db.Loaner }
            ]
        })
        .then(function (dbRequest) {
            res.json(dbRequest);
        })
})

//Find Request by user ID
router.get("/user/:id", function (req, res) {
    db.Request.findAll(
        {
            where: { userRequestId: req.params.id },
            include: [
                { model: db.User, as: "userRequest" },
                { model: db.User, as: "userApprove" },
                { model: db.Equipment },
                { model: db.Loaner }
            ]
        })
        .then(function (dbRequest) {
            res.json(dbRequest);
        })
        .catch(function (error) {
            res.json(error);
        })
})

//Find Request By ID
router.get("/:id", function (req, res) {
    db.Request.findByPk(req.params.id,
        {
            include: [
                { model: db.User, as: "userRequest" },
                { model: db.User, as: "userApprove" },
                { model: db.Equipment },
                { model: db.Loaner }
            ]
        })
        .then(function (dbRequest) {
            res.json(dbRequest);
        })
})

//Create New Request
router.post("/", function (req, res) {
    db.Request.create(req.body)
        .then(function (dbRequest) {
            res.json(dbRequest);
        })
})

//Update Request
router.put("/:id", function (req, res) {
    db.Request.update(req.body, { where: { id: req.params.id } })
        .then(function (dbRequest) {
            res.json(dbRequest);
        })
})

//Delete Request
router.delete("/:id", function (req, res) {
    db.Request.destroy({ where: { id: req.params.id } })
        .then(function (dbRequest) {
            res.json(dbRequest);
        })
})

module.exports = router;