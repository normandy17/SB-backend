const express = require("express");
const Birds = require("../models/birds");
const router = express.Router();
const pagination=require("./pagination")
const {addBird,getBirds,getBird,editBird,deleteBird,searchResult} = require("../Controllers/birds-controller");

router.get("/",pagination(Birds),getBirds)
router.get("/bird/:id", getBird);
router.post("/", addBird);
router.post("/search", searchResult);
router.put("/:id",editBird )
router.delete("/:id",deleteBird )

module.exports = router;
