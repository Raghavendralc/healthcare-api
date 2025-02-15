const bcryptjs = require('bcryptjs');

const encryptData = async (data) => {
    const salt = await bcryptjs.genSalt(10);
    const hashedData = await bcryptjs.hash(data, salt);
    return hashedData;
};

module.exports = encryptData;