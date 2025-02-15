const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { successResponse, errorResponse } = require('../utils');

const generateToken = (user) => {
    return jwt.sign(
        {
            email: user.email,
            role: user.role,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            user: 'TeAcHaCk'
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const register = async (req, res) => {
    try {
        const { name, email, password, role = 'user' } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return errorResponse(res, 'User already exists with this email', 409);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            createdBy: 'TeAcHaCk'
        });

        // Generate token
        const token = generateToken(user);

        return successResponse(res, {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token,
            expiresIn: 3600,
            tokenType: 'Bearer'
        }, 'Registration successful', 201);

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return errorResponse(res, 'Validation Error', 400, messages);
        }
        return errorResponse(res, error.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, 'Invalid email or password', 401);
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return errorResponse(res, 'Invalid email or password', 401);
        }

        // Generate token
        const token = generateToken(user);

        return successResponse(res, {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token,
            expiresIn: 3600,
            tokenType: 'Bearer'
        }, 'Login successful');

    } catch (error) {
        return errorResponse(res, error.message);
    }
};

module.exports = {
    register,
    login
};