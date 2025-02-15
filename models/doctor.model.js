const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    specialization: {
        type: String,
        required: [true, 'Specialization is required'],
        trim: true
    },
    experience: {
        type: Number,
        required: [true, 'Years of experience is required'],
        min: [0, 'Experience cannot be negative']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
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

module.exports = mongoose.model('Doctor', doctorSchema);