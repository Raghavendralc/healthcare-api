const fs = require('fs');
const path = require('path');

// Define directories to create
const directories = [
    'controllers',
    'models',
    'routes',
    'middleware',
    'utils',
    'public/assets/images/patients'
];

// Create directories
directories.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`Created directory: ${fullPath}`);
    }
});