const express = require('express');
const cors = require('cors');
const { connectDb } = require('./utils');
const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
const doctorRoutes = require('./routes/doctor.routes');
const mappingRoutes = require('./routes/mapping.routes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/mappings', mappingRoutes);


// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await connectDb(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log(`
🚀 Server Status:
- Port: ${PORT}
- Environment: ${process.env.NODE_ENV}
- Timestamp: ${new Date().toISOString().replace('T', ' ').substring(0, 19)}
- User: ${process.env.USER || 'TeAcHaCk'}
- MongoDB: Connected
- API URL: http://localhost:${PORT}/api/v1
`);
        });
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
};

startServer();