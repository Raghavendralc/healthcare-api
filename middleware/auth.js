const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils');

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return errorResponse(res, 'Access denied. No token provided.', 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return errorResponse(res, 'Invalid token', 401);
    }
};

const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return errorResponse(res, 'Access denied. Admin rights required.', 403);
    }
    next();
};

module.exports = {
    verifyToken,
    isAdmin
};