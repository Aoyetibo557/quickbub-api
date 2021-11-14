const express = require('express');
const router = express.Router();


//load controller
const appConfigController = require('./appConfig.js');
const tutorialConfigController = require('../routes/tutRout.js');
const userConfigController = require('../routes/userRoutes.js');
const jobConfigController = require('../routes/jobRoutes.js');


//Each controller will be mounted under specific routes. These will be prefixes to all routes defined inside the controller
router.use('/jobs', jobConfigController);
router.use('/users', userConfigController);
router.use('/tutorials', tutorialConfigController);
router.use('/application-configuration', appConfigController);

module.exports = router;
