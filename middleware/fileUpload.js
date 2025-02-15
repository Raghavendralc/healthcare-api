const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create directories if they don't exist
const createDirectories = () => {
    const baseDir = 'public/assets/images';
    const doctorsDir = path.join(baseDir, 'doctors');
    
    // Create directories recursively
    [baseDir, doctorsDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Create directories before saving
        createDirectories();
        cb(null, 'public/assets/images/doctors');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `profile-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

module.exports = upload;