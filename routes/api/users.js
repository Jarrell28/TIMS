const router = require("express").Router();
const db = require("../../models");

const jwt = require("jsonwebtoken");

//Find User By ID
router.get("/:id", function (req, res) {
  db.User.findByPk(req.params.id).then(function (dbUser) {
    res.json(dbUser);
  });
});

//Create New User
router.post("/", function (req, res) {
  db.User.findOrCreate({
    where: { email: req.body.email },
    defaults: req.body
  }).then(function (dbUser) {
    res.json(dbUser);
  });
});

//Update User
router.put("/:id", function (req, res) {
  db.User.update(req.body, { where: { id: req.params.id } }).then(function (
    dbUser
  ) {
    res.json(dbUser);
  });
});

//Delete User
router.delete("/:id", function (req, res) {
  db.User.destroy({ where: { id: req.params.id } }).then(function (dbUser) {
    res.json(dbUser);
  });
});

//login
router.post("/login", (req, res) => {
  // console.log(req.body.email);
  db.User.findAll({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        //checks if passwords match 
        if (req.body.password === user[0].dataValues.password) {
          //creates token via JWT
          let token = jwt.sign(user[0].dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.send({
            success: true,
            token
          });
        } else {
          //User exists but password doesn't match
          res.json({ success: false, error: "Could not validate user" });
        }
      } else {
        //User doesn't exist
        res.json({ success: false, error: "User does not exist" });
      }
    })
    .catch(err => {
      res.json({ success: false, error: "User does not exist" });
    });
});

module.exports = router;
