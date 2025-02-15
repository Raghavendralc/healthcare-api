const multer = require('multer');
const path = require('path');
const { formatDate } = require('./dateFormatter');

const createStorage = (subFolder) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./public/assets/images/${subFolder}`);
        },
        filename: (req, file, cb) => {
            const timestamp = formatDate().replace(/[: ]/g, '-');
            const uniqueSuffix = `${timestamp}-${Math.round(Math.random() * 1E9)}`;
            cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
        }
    });
};

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const createUploader = (subFolder) => {
    return multer({
        storage: createStorage(subFolder),
        fileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024 // 5MB
        }
    });
};

module.exports = {
    createUploader,
    doctorUpload: createUploader('doctors'),
    patientUpload: createUploader('patients')
};