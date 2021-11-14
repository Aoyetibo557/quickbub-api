const db = require("../models");
const Jobs = db.jobs; //from the database table
const Op = db.Sequelize.Op;



// Function to create a new Job
exports.createJob = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // object to hold the passed in data for the job from the user endpoint
    const job = {
        jobId: req.body.jobId,
        title: req.body.title,
        joblocation: req.body.joblocation,
        author: req.body.author,
        jobstatus: req.body.jobstatus,
        description: req.body.description,
        rating: req.body.rating,
        price: req.body.price,
        tag1: req.body.tag1,
        tag2: req.body.tag2,
    };

    // This takes in the object above
    Jobs.create(job)
    .then(results => {
        res.status(200).json( {
            message: "Job Created Sucessfully",
            newjob: results
        });
    })
    .catch(error => {
        res.status(500).send({
            message: 
                error.message || "Could Not create Job! Error occured"
        })
    })

}


// later on update this function to query for title, date, category also
exports.findAll = (req, res) => {
    const title = req.query.username;
    var condition = title ? {title: {[Op.like]: `%${title}%` } } : null;

    Jobs.findAll({where: condition})
    .then(results => {
        if(results.length > 0 ){
            res.status(201).json({
                message: "All the Jobs In the Jobs Table",
                jobs: results
            })
        }
        else{ 
            res.status(400).json({
                message: "No jobs in the database",
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Error occured While retrieving data!",

        })
    })
}

// find all jobs by a single author/users
exports.findOne = (req, res) => {
    const author = req.params.author;
    var condition = {[Op.like] : [
        {author: author ? author : null}
    ]}

    var altCondition = author ? { author: { [Op.like]: `%${author}` } } : null;

    Jobs.findOne({where: altCondition})
    .then(data => {
        if(!data) {
            res.status(500).send("No Jobs found under that author!");
        }else {
            res.status(200).json({
                message: "All Jobs by the author",
                jobs: data
            })
            console.log("Sucess!");
        }
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || `Couldn't Find An Account with the author=${author}`
        })
    })
}

// function to update job status
exports.updateStatus = (req, res) => {
    // get the job that needs to be updated by id
    const id = req.params.jobId;
    Jobs.findAll({where: {jobId: id}})
    .then(found => {
        if(!found) {
            res.status(404).json({
                message: "Job not found!"
            })
        }else {
            found.update(req.body.jobstatus, {where: {jobId: id}})
            .then(num => {
                if(num == 1) {
                    res.status(200).json({
                        message: "Job Status was updated sucessfully",

                    })
                }else {
                    res.status(404).json({
                        message: `Could not update jobstatus with the job id: ${id}`
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: error.message || `Error updating user profile with the id: ${id}`
                })
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: error.message || `Error Finding user profile with the id: ${id}`
        })
    })

}

// Function to delete job with passedid
exports.delete = (req, res) => {
    const id= req.params.id;

    Jobs.destroy({
        where: {id: id}
    })

    .then(num => {
        if(num == 1) {
            res.status(200).json({
                message: "Job Successfully deleted!",
                status: 200
            })
        }else {
            res.status(404).json({
                message: `Cannot delete job with the id = ${id}`
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: `Error deleting job with the id = ${id}`
        })
    })
}