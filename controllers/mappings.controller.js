const Mapping = require('../models/patient-doctor.model');
const Patient = require('../models/patient.model');
const Doctor = require('../models/doctor.model');
const { successResponse, errorResponse } = require('../utils');

const createMapping = async (req, res) => {
    try {
        const { patientId, doctorId, notes } = req.body;

        // Check if patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return errorResponse(res, 'Patient not found', 404);
        }

        // Check if doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return errorResponse(res, 'Doctor not found', 404);
        }

        // Check if mapping already exists
        const existingMapping = await Mapping.findOne({ patientId, doctorId });
        if (existingMapping) {
            return errorResponse(res, 'Mapping already exists', 409);
        }

        const mapping = await Mapping.create({
            patientId,
            doctorId,
            notes,
            assignedDate: new Date().toISOString(),
            createdBy: req.user.email
        });

        // Populate patient and doctor details
        const populatedMapping = await Mapping.findById(mapping._id)
            .populate('patientId', 'name email phone')
            .populate('doctorId', 'name specialization');

        return successResponse(res, populatedMapping, 'Mapping Created Successfully', 201);

    } catch (error) {
        if (error.code === 11000) {
            return errorResponse(res, 'Mapping already exists', 409);
        }
        return errorResponse(res, error.message);
    }
};

const getMappings = async (req, res) => {
    try {
        const mappings = await Mapping.find({})
            .populate('patientId', 'name email phone')
            .populate('doctorId', 'name specialization');

        if (!mappings.length) {
            return errorResponse(res, 'No Mappings Found', 404);
        }

        return successResponse(res, mappings, 'Mappings Fetched Successfully');
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

const updateMapping = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        const mapping = await Mapping.findByIdAndUpdate(
            id,
            { 
                $set: { 
                    status, 
                    notes,
                    updatedAt: new Date().toISOString()
                } 
            },
            { new: true, runValidators: true }
        ).populate('patientId', 'name email phone')
         .populate('doctorId', 'name specialization');

        if (!mapping) {
            return errorResponse(res, 'Mapping Not Found', 404);
        }

        return successResponse(res, mapping, 'Mapping Updated Successfully');
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

const deleteMapping = async (req, res) => {
    try {
        const { id } = req.params;
        const mapping = await Mapping.findByIdAndDelete(id)
            .populate('patientId', 'name email phone')
            .populate('doctorId', 'name specialization');

        if (!mapping) {
            return errorResponse(res, 'Mapping Not Found', 404);
        }

        return successResponse(res, mapping, 'Mapping Deleted Successfully');
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

const getPatientMappings = async (req, res) => {
    try {
        const { patientId } = req.params;
        
        const mappings = await Mapping.find({ patientId })
            .populate('doctorId', 'name specialization');

        if (!mappings.length) {
            return errorResponse(res, 'No Doctors Found for this Patient', 404);
        }

        return successResponse(res, mappings, 'Patient Mappings Fetched Successfully');
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

const getDoctorMappings = async (req, res) => {
    try {
        const { doctorId } = req.params;
        
        const mappings = await Mapping.find({ doctorId })
            .populate('patientId', 'name email phone');

        if (!mappings.length) {
            return errorResponse(res, 'No Patients Found for this Doctor', 404);
        }

        return successResponse(res, mappings, 'Doctor Mappings Fetched Successfully');
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

module.exports = {
    createMapping,
    getMappings,
    updateMapping,
    deleteMapping,
    getPatientMappings,
    getDoctorMappings
};