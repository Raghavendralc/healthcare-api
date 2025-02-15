const { errorResponse } = require('../utils');

const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            const { error } = schema.validate(req.body);
            if (error) {
                return errorResponse(res, error.details[0].message, 400);
            }
            next();
        } catch (err) {
            next(err);
        }
    };
};

module.exports = validateRequest;