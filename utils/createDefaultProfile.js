const fs = require('fs').promises;
const path = require('path');

const createDefaultProfile = async () => {
    const defaultProfilePath = 'public/assets/images/doctors/default-profile.png';
    try {
        await fs.access(defaultProfilePath);
    } catch (error) {
        // Create directories if they don't exist
        await fs.mkdir(path.dirname(defaultProfilePath), { recursive: true });
        
        // Copy default image from your assets
        await fs.copyFile(
            'assets/default-profile.png',
            defaultProfilePath
        );
    }
};

module.exports = createDefaultProfile;