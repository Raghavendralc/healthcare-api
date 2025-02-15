const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const {
    addDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
} = require('../controllers/doctors.controller');

// Protect all routes with authentication
router.use(verifyToken);

// Routes
router.route('/')
    .get(getDoctors)
    .post(isAdmin, addDoctor);

router.route('/:id')
    .get(getDoctorById)
    .put(isAdmin, updateDoctor)
    .delete(isAdmin, deleteDoctor);

module.exports = router;