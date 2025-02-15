const bcryptjs = require('bcryptjs');

const decryptData = async (data, hashedData) => {
    const isMatch = await bcryptjs.compare(data, hashedData);
    return isMatch;
};

module.exports = decryptData;