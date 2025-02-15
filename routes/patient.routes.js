const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const { 
    addPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient 
} = require('../controllers/patients.controller');

// Protect all routes with authentication
router.use(verifyToken);

// Routes
router.route('/')
    .get(getPatients)
    .post(isAdmin, addPatient);

router.route('/:id')
    .get(getPatientById)
    .put(isAdmin, updatePatient)
    .delete(isAdmin, deletePatient);

module.exports = router;