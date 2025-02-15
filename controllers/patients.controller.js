const Patient = require('../models/patient.model');
const { successResponse, errorResponse } = require('../utils');

const addPatient = async (req, res) => {
    try {
        const { name, age, gender, phone, address, bloodGroup } = req.body;

        const patient = await Patient.create({
            name,
            age,
            gender,
            phone,
            address,
            bloodGroup,
            createdBy: req.user.email
        });

        return successResponse(res, patient, 'Patient Added Successfully', 201);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return errorResponse(res, 'Validation Error', 400, messages);
        }
        return errorResponse(res, error.message);
    }
};

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({});
        if (!patients.length) {
            return errorResponse(res, 'No Patients Found', 404);
        }
        return successResponse(res, patients, 'Patients Fetched Successfully');
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);
        
        if (!patient) {
            return errorResponse(res, 'Patient Not Found', 404);
        }
        
        return successResponse(res, patient, 'Patient Fetched Successfully');
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!patient) {
            return errorResponse(res, 'Patient Not Found', 404);
        }

        return successResponse(res, patient, 'Patient Updated Successfully');
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return errorResponse(res, 'Validation Error', 400, messages);
        }
        return errorResponse(res, error.message);
    }
};

const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndDelete(id);

        if (!patient) {
            return errorResponse(res, 'Patient Not Found', 404);
        }

        return successResponse(res, patient, 'Patient Deleted Successfully');
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

module.exports = {
    addPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
};