const express = require('express');
const router = express.Router();

// GET request
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "test get"
    });
});

// POST request
router.post('/', (req, res, next) => {
    // create a new obj from the body of the request
    const testBody = {
        name: req.body.name
    }
    res.status(200).json({
        message: "test post",
        createdObj: testBody
    });
});

// GET request with param in the endpoint
router.get('/:testId', (req, res, next) => {
    const id = req.params.testId;

    res.status(200).json({
        message: "test get" + id
    });
});

module.exports = router;