const router = require("express").Router();
const { getTurns, postTurn } = require("../controllers/turn.controllers");

router.get("/turns", getTurns);
router.post("/turn", postTurn);

module.exports = router;