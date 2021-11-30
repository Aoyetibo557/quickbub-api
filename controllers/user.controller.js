const db = require("../models");
const UserProfiles = db.users;
const Op = db.Sequelize.Op;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


//Simple Create To test api and save a new user account
exports.create = (req, res) => {
    //Validate request
    if(!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //create user
    const user = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        location: req.body.location,
        usertype: req.body.usertype
    };

    //save user in the database
    UserProfiles.create(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "An error occured while creating new user"
        });
    });
};

// Retrieve all users in the database
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

    UserProfiles.findAll({where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "An error occured while retrieving user profiles"
        });
    });
};

//update a user by id 
exports.update = (req, res) => {
    const id = req.params.id;

    UserProfiles.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "User Profile was updated successfully."
            });
        }else{
            res.send({
                message: `Cannot update the user with id=${id}. Try again Later!`
            });
        }
    }) 
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error updating user profile with id ="+ id
        });
    });
};


// Retieve a single user account!
exports.findOne = (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
   
    
    var condition = { [Op.and]: [
        {username: username ? username : null },
        {password: password ? password : null}
    ]}

    UserProfiles.findOne({where: {username: username }})
    .then(data => {
        if(!data) {
            res.status(500).send("No Account Matches Parameters!");
            console.log("No Account Matches Parameter!");
        }else{
            
            res.send(data);
            console.log("Sucess!")
        }
        
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || `Couldn't Find An Account with the username: ${username}`
        });
    });
};


// create a new account function
exports.signUp =(req, res) => {

    //Validate request
    if(!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty! "+ req.body.username
        });
        return;
    }

    //prevent duplicate usernames
    UserProfiles.findOne({where: {username: req.body.username}})
    .then(result => {
        // if user exist send error message and stop
        if(result){
            res.status(409).json({
                message: "Username Already Exist, Choose a new One"
            });
            return;
        }else{
            // If there is no user with the same username in the database run function below
            //generating salt
            bcryptjs.genSalt(10, function(err, salt){
                //hashing password
                bcryptjs.hash(req.body.password, salt, function(err, hash){

                    //create user
                    const user = {
                        username: req.body.username,
                        password: hash, //this is the hashed password
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        age: req.body.age,
                        gender: req.body.gender,
                        location: req.body.location,
                        usertype: req.body.usertype,
                        county: req.body.county
                    };

                    UserProfiles.create(user)
                    .then(results => {
                        if(results) {
                            // This is not workin yet*
                            // Create a token for new user 
                            const token = jwt.sign({
                                userName: results.username,
                                userId: results.id,
                                email:results.email,
                                phone: results.phone,
                                name: results.name,
                                county: results.county,
                                age: results.age,
                                gender: results.gender,
                                location: results.location,
                                userType: results.usertype,
                            },'secret', function(err, token) {
                                res.status(200).json({
                                    message: "Account Created Successfully!. Signup Authentication Sucessfull",
                                    token: token,
                                    user: results
                                });
                            });

                           
                        }else{
                            res.status(401).json({
                                message: "An error occured while creating profile!"
                            })
                        }

                        // res.status(201).json({
                        //     message: "Account Created Sucessfully!",
                        //     user: results,
                        // })
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "An error occured while creating new account"
                        });
                    })

                });

            });

           
        }
    })
    .catch(err=> {
        res.status(500).json({
            message: "Something Went wrong Creating a new Account!: " + err
        })
    })

}


//Login Function
// change params to body and update login component to use body not params
exports.login = (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    UserProfiles.findOne({where: {username: username}})
    .then(user => {
        if(user === null) {
            //No user found with the username
            res.status(401).json({
                message: "Invalid credentials!",
            })
        }else{
            //compare the password with the hashed password in the database
             //Note to self: 'secret' should not be hardcoded, it should be in an ENV file and called from there.
            bcryptjs.compare(password, user.password, function(err, result) {
                if(result) {
                    //Passwords match - generate access token for user
                    //pass in values from the retrieves user to the token
                    const token = jwt.sign({
                        userName: user.username,
                        password: password,
                        name:user.name,
                        email: user.email,
                        phone: user.phone,
                        age: user.age,
                        gender: user.gender,
                        location: user.location,
                        userId: user.id,
                        county: user.county,
                        userType: user.usertype,
                    }, 'secret', function(err, token) {
                        res.status(200).json({
                            message: "Authentication Sucessfull!",
                            token: token,
                            user: user,
                            status: 200
                        });
                    });

                }else{
                    res.status(401).json({
                        message: "Invalid Credentials!",
                        status: 401
                    })
                }
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Athentication Error!",
            error: error
        })
    })
}


// Remove Profile from users table
exports.delete = (req, res) => {
    const id = req.params.id;

    UserProfiles.destroy({
        where: {id: id }
    })

    .then ( num => {
        if(num == 1){
            res.status(200).json({
                message: "Profile deleted Successfully!"
            });
        }else{
            res.status(404).json({
                message: `Cannot delete profile with id = ${id}`
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: `Cannot delete profile with id = ${id}`

        });
    });
};


// find a profile by name
exports.findbyName = (req, res) => {
    const name = req.params.name;

    const condition = name ? { name: {[Op.like]: `%${name}`}} : null;

    UserProfiles.findOne({where: {name: name}})
    .then(result => {
        if(result === null) {
            res.status(404).json({
                message: "User Profile Not Found!",
            })
            
        }
        else {
            res.status(201).json({
                message: "User Profile Details!",
                user: result
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "An error occured while retriving user profile!" + " " +error,
            user: result
        })
    })
}