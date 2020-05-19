const router = require("express").Router();
const db = require("../../models");
const path = require("path");

//Find All Equipments
router.get("/", function (req, res) {
    console.log("get equipment")
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

//Find Equipment Count
router.get("/count/:model", function (req, res) {
    const model = req.params.model;
    db.Equipment.count(
        {
            where: [
                { model },
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


//Query to get data back based on productContext value to filter data by category
router.get("/category/:category", function (req, res) {
    //save category param into a variable
    const categoryParam = req.params.category;
    //query the Category table where the category param equals the category table ID

    if (categoryParam === "0") {
        db.Equipment.findAll({
        }).then(dbEquipment => {
            res.json(dbEquipment);
        })
    } else {
        db.Equipment.findAll({
            where: {
                categoryId: categoryParam,
            }
        }).then(dbEquipment => {
            res.json(dbEquipment);
        })
    }

})





//Create New Equipment
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

            db.Equipment.create(body)
                .then(function (dbEquipment) {
                    res.json(dbEquipment);
                })
        });
    } else {
        db.Equipment.create(req.body)
            .then(function (dbEquipment) {
                res.json(dbEquipment);
            })
    }


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