const formatDateTime = require('./dateFormatter').formatDate;

const successResponse = (res, data, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        timestamp: formatDateTime(),
        user: process.env.USER || 'TeAcHaCk'
    });
};

const errorResponse = (res, message = "Error occurred", statusCode = 500, error = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: error?.message || error,
        timestamp: formatDateTime(),
        user: process.env.USER || 'TeAcHaCk'
    });
};

module.exports = {
    successResponse,
    errorResponse
};