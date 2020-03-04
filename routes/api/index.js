const router = require("express").Router();
const userRoutes = require("./users");
const requestRoutes = require("./requests");
const equipmentRoutes = require("./equipment");
const loanerRoutes = require("./loaners");
const categoryRoutes = require("./categories");
const authentication = require("./authentication");
const app_login = require("./app_login");

// User routes
router.use("/users", userRoutes);
router.use("/requests", requestRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/loaners", loanerRoutes);
router.use("/categories", categoryRoutes);
router.use("/login", app_login);

module.exports = router;