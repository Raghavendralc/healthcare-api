const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const {
    createMapping,
    getMappings,
    updateMapping,
    deleteMapping,
    getPatientMappings,
    getDoctorMappings
} = require('../controllers/mappings.controller');

// Protect all routes with authentication
router.use(verifyToken);

// Basic mapping routes
router.route('/')
    .post(isAdmin, createMapping)
    .get(getMappings);

router.route('/:id')
    .put(isAdmin, updateMapping)
    .delete(isAdmin, deleteMapping);

// Get mappings by patient/doctor
router.get('/patient/:patientId', getPatientMappings);
router.get('/doctor/:doctorId', getDoctorMappings);

module.exports = router;