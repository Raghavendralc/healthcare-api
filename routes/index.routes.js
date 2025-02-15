const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const patientRoutes = require('./patient.routes');
const doctorRoutes = require('./doctor.routes');
const mappingRoutes = require('./mapping.routes');
const { errorResponse } = require('../utils/response');

const API_PREFIX = '/api/v1';

// Mount routes
router.use(`${API_PREFIX}/auth`, authRoutes);
router.use(`${API_PREFIX}/patients`, patientRoutes);
router.use(`${API_PREFIX}/doctors`, doctorRoutes);
router.use(`${API_PREFIX}/mappings`, mappingRoutes);
// API routes
router.use('/api/auth', authRoutes);
router.use('/api/patients', patientRoutes);
router.use('/api/doctors', doctorRoutes);
router.use('/api/mappings', mappingRoutes);

// Error handling middleware
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            error: true,
            message: "File upload error",
            details: err.message
        });
    }
    
    console.error(err);
    res.status(500).json({
        error: true,
        message: "Internal server error",
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = router;