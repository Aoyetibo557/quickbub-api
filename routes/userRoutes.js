const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller.js")

//Simple Create to test Api for a new user profile
router.post("/", user.create);

//Main create / Signup function
router.post("/signup", user.signUp);

//Main Login route on user end
router.get("/login/:username/:password", user.login);

// Delete a profile route
router.delete("/delete/:id", user.delete);

//Retrieve all profiles
router.get("/all", user.findAll);

//Update a user profile by id in request
router.put("/update/:id", user.update);

//Find a user by username 
router.get("/find/:username", user.findOne);

//Find a user by signup name/ profile name
router.get("/finduser/:name", user.findbyName);

module.exports = router;