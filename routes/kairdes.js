const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const kairdeController = require("../controllers/kairdes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, kairdeController.getKairde);
router.post("/createPost", kairdeController.createKairde);
router.delete("/deletePost/:id", kairdeController.deleteKairde);

module.exports = router;
