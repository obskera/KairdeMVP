const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const kairdeController = require("../controllers/kairdes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/settings", ensureAuth, postsController.getSettings)
router.get("/profile", ensureAuth, postsController.getProfile);
//add controller methods for these, render bio and feed variable for tool
router.get("/profile/contactKairde", ensureAuth, postsController.getContactTool)
router.get("/profile/bioKairde", ensureAuth, postsController.getBioTool)
router.get("/profile/resumeKairde", ensureAuth, postsController.getResumeTool)
//seperate method to get kairde feed
router.get("/profile/myKairdes", ensureAuth, postsController.getMyKairdes)
// router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/feed", ensureAuth, kairdeController.getKairdeFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.put("/updateInfo/:userID", authController.putUser);

module.exports = router;
