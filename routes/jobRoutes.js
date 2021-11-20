const express = require("express");
const router = express.Router();

const job = require("../controllers/job.controller.js");

// route to create job
router.post("/createjob", job.createJob);


// route to output all jobs /jobs/all
router.get("/all", job.findAll);

// Route to retrieve jobs based on the users/author
router.get("/find/:author", job.findByAuthor);


// find jobs by title && all the jobs in the table
router.get("/findtitle/:title", job.findByTitle);

// update job status
// Not yet working
router.put("/update/:id", job.updateStatus);

router.delete("/delete/:id", job.delete);

module.exports = router;
