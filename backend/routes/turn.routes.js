const router = require("express").Router();
const { getTurns, postTurn } = require("../controllers/turn.controllers");

router.get("/turns/:id", getTurns);
router.post("/turn", postTurn);

module.exports = router;