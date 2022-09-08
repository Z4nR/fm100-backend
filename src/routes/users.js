const router = require("express-promise-router")();
const Controllers = require("../controllers/controller");

router.route("/newIndiUser").post(Controllers.newIndiUser);

module.exports = router;
