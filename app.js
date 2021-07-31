const express = require("express");
const app = express();
const morgan = require("morgan"); // logging
const bodyParser = require("body-parser");

// use logging middleware
app.use(morgan('dev'));

// use Body parsing middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS handling
app.use((req, res, next) => {
    // add headers
    res.header('Access-Control-Allow-Origin', '*'); // restrict this for your own domains
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    // allowed REST methods
    if(req.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// test router
const testRouter = require('./api/routes/test');
app.use('/test', testRouter); // use test router middleware

// Handles requests that aren't included with above routers
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Error handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
