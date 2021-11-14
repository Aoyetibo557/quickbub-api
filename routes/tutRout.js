const express = require("express");
const router = express.Router();
const tutorials = require("../controllers/tutorial.controller.js");



//Create a new post
router.post("/", tutorials.create);

// Retrieve all Tutorials
router.get("/", tutorials.findAll);

// Retrieve a single Tutorial with id
router.get("/:id", tutorials.findOne);
 
// Retrieve all published Tutorials
router.get("/published", tutorials.findAllPublished);

// Update a Tutorial with id
  router.put("/:id", tutorials.update);


// Delete a Tutorial with id
//   router.delete("/del/:id", tutorials.delete);

// Delete all Tutorials
// router.delete("/del", tutorials.deleteAll);

module.exports = router;