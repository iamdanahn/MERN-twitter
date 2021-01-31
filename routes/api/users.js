const express = require("express"); // grabs express pkg from node
const router = express.Router();    

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

module.exports = router;
