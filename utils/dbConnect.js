const mongoose = require('mongoose');

const connectDb = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

module.exports = connectDb;