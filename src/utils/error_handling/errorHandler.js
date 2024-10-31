// utils/error_handling/errorHandler.js

const { AppError } = require('./customErrors');

const errorHandler = (err, req, res, next) => {
    const statusCode = err.isOperational ? err.statusCode : 500;
    const message = err.isOperational ? err.message : 'Something went wrong!';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });

    // Log the error (you can use your logger here)
    console.error(err);
};

module.exports = errorHandler;
