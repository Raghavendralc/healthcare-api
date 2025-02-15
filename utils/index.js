const mongoose = require('mongoose');

// Database connection
const connectDb = async (url) => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            family: 4 // Use IPv4, skip trying IPv6
        };

        await mongoose.connect(url, options);
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.log('🔄 Attempting to connect to MongoDB...');
        
        // Check if MongoDB is running
        const mongoStatus = await checkMongoDBStatus();
        if (!mongoStatus.running) {
            console.error(`
⚠️ MongoDB is not running. Please:
1. Open Command Prompt as Administrator
2. Run these commands:
   net start MongoDB
   OR
   "C:\\Program Files\\MongoDB\\Server\\{version}\\bin\\mongod.exe" --dbpath="C:\\data\\db"
`);
        }
        process.exit(1);
    }
};

// Check MongoDB Status
const checkMongoDBStatus = async () => {
    try {
        const { exec } = require('child_process');
        
        return new Promise((resolve) => {
            exec('sc query MongoDB', (error, stdout) => {
                if (error) {
                    resolve({ running: false, message: 'MongoDB service not found' });
                    return;
                }
                
                const running = stdout.includes('RUNNING');
                resolve({ 
                    running, 
                    message: running ? 'MongoDB is running' : 'MongoDB is not running' 
                });
            });
        });
    } catch (error) {
        return { running: false, message: error.message };
    }
};

// Response handlers
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        user: process.env.USER || 'TeAcHaCk'
    });
};

const errorResponse = (res, message = 'Error', statusCode = 500, error = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        user: process.env.USER || 'TeAcHaCk'
    });
};

module.exports = {
    connectDb,
    successResponse,
    errorResponse
};