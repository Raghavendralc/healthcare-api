const roleAuth = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({
                error: true,
                message: "Access denied"
            });
        }

        if (allowedRoles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({
                error: true,
                message: "You don't have permission to perform this action"
            });
        }
    };
};

module.exports = roleAuth;