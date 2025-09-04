
const {VALIDATION_ERROR,UNAUTHORIZED,FORBIDDEN,NOT_FOUND} = require('../constants');    
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode;
    if(!statusCode || statusCode === 200){
        statusCode = 500;
    }

    // By-default status code is 200 so explicitly setting it by checking the error
    if (err.name === "ValidationError") {
        statusCode = 400; 
    }

    switch(statusCode){
        case VALIDATION_ERROR:
            res.json({
            title : "Validation Error",
            message: err.message,
            stackTrace : err.stack
        })
        break;

        case NOT_FOUND:
            res.json({
            title : "Not Found",
            message: err.message,
            stackTrace : err.stack
        })
        break;

        case UNAUTHORIZED:
            res.json({
            title : "Unauthorized",
            message: err.message,
            stackTrace : err.stack
        })
        break;

        case FORBIDDEN:
            res.json({
            title : "Forbidden",
            message: err.message,
            stackTrace : err.stack
        })
        break;

        default:
            res.json({
            title : "Server Error",
            message: err.message,
            stackTrace : err.stack
        })
    }
}

module.exports = errorHandler;
