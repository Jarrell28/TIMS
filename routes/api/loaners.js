const router = require("express").Router();
const db = require("../../models");
const path = require("path");

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

//Find Loaner Count
router.get("/count/:model", function (req, res) {
    const model = req.params.model;
    db.Loaner.count(
        {
            where: [
                { model },
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

    //If Image has been uploaded, uploads file to image folder and saves name in db
    if (req.files) {
        const tempImage = req.files.eImage;
        const imageFolder = path.join(__dirname, "../../client/public/images/");

        tempImage.mv(imageFolder + tempImage.name, function (err) {
            if (err)
                return res.status(500).send(err);

            const body = Object.assign({}, req.body);
            body.image = tempImage.name;

            db.Loaner.create(body)
                .then(function (dbLoaner) {
                    res.json(dbLoaner);
                })
        });
    } else {
        db.Loaner.create(req.body)
            .then(function (dbLoaner) {
                res.json(dbLoaner);
            })
    }


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