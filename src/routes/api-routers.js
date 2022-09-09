const router = require("express-promise-router")();
const IndividualController = require("../controllers/IndividualController");

//Individual User
router.route("/new-user-individual").post(IndividualController.newIndiUser);
router.route("/user-data/:userId").get(IndividualController.getIndiUser);

module.exports = router;
