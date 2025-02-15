const jwt = require('jsonwebtoken');
const { errorResponse } = require('./response');
const { formatDate } = require('./dateFormatter');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        
        if (!token || !token.startsWith("Bearer")) {
            return errorResponse(res, "Authentication token required", 401);
        }

        const bearerToken = token.split(" ")[1];
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
            name: decoded.name,
            loginTime: formatDate()
        };
        
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return errorResponse(res, "Token has expired", 401);
        }
        return errorResponse(res, "Invalid authentication token", 401);
    }
};

module.exports = auth;