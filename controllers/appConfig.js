const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        title: 'QuickBuck Service Application',
        description: 'QuickBuck is a simple job finder application for those in need of quick cash and easy tasks.',
    });
});

router.get('/hello', (req, res) => {
    res.json({
        title: "Hello World",
    })
})

module.exports = router;