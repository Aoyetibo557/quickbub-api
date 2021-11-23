const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

var corsOption = {
  origin: "http://localhost:9090" || "https://quickbuck-api.herokuapp.com",

};


//database models
db.sequelize.sync();

//on save this deletes the entire table
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


app.use(cors(corsOption));


//parse requests of content-type -application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

// Middleware that lifts the cors restriction for routing from a diffrent url to the server url
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-origin', '*');
  next();
})

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Anu's and Hassan's Quickbuck application." });
});

// this mounts controllers/index.js at the route `/api`
app.use('/api', require('./controllers'));


// for production use, we serve the static react build folder
if(process.env.NODE_ENV==='production') {
  // app.use(express.static(path.join(__dirname, '../client/build')));

  // all unknown routes should be handed to our react app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// update DB tables based on model updates. Does not handle renaming tables/columns
// NOTE: toggling this to true drops all tables (including data)
db.sequelize.sync({ force: false });

// require("../api/routes/tutorial.routes")(app);
// // app.use('/api', require('./routes/tutorial.routes'))

// set port, listen for requests
const PORT = process.env.PORT || 9090;

// start up the server
if(PORT) {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
} else {
  console.log("===== ERROR ====\nCREATE A .env FILE!\n===== /ERROR ====")
}


