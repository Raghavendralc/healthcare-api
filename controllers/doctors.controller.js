const Doctor = require('../models/doctor.model');
const { successResponse, errorResponse } = require('../utils');

const addDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            specialization,
            experience,
            address
        } = req.body;

        // Check for existing doctor
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return errorResponse(res, 'Doctor already exists with this email', 409);
        }

        const doctor = await Doctor.create({
            name,
            email,
            phone,
            specialization,
            experience,
            address,
            createdBy: req.user.email
        });

        return successResponse(res, doctor, 'Doctor Added Successfully', 201);

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return errorResponse(res, 'Validation Error', 400, messages);
        }
        return errorResponse(res, error.message);
    }
};

const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        if (!doctors.length) {
            return errorResponse(res, 'No Doctors Found', 404);
        }
        return successResponse(res, doctors, 'Doctors Fetched Successfully');
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findById(id);
        
        if (!doctor) {
            return errorResponse(res, 'Doctor Not Found', 404);
        }
        
        return successResponse(res, doctor, 'Doctor Fetched Successfully');
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!doctor) {
            return errorResponse(res, 'Doctor Not Found', 404);
        }

        return successResponse(res, doctor, 'Doctor Updated Successfully');
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return errorResponse(res, 'Validation Error', 400, messages);
        }
        return errorResponse(res, error.message);
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findByIdAndDelete(id);

        if (!doctor) {
            return errorResponse(res, 'Doctor Not Found', 404);
        }

        return successResponse(res, doctor, 'Doctor Deleted Successfully');
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

module.exports = {
    addDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
};