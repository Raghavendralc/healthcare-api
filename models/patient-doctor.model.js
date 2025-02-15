const mongoose = require('mongoose');

const mappingSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Patient ID is required']
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'Doctor ID is required']
    },
    assignedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    notes: {
        type: String,
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        default: 'TeAcHaCk'
    }
}, {
    timestamps: true,
    versionKey: false
});

// Compound index to prevent duplicate mappings
mappingSchema.index({ patientId: 1, doctorId: 1 }, { unique: true });

module.exports = mongoose.model('Mapping', mappingSchema);